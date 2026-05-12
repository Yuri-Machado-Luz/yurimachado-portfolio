import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    emailjs.init(import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY as string);
  }, []);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    try {
      await emailjs.sendForm(
        import.meta.env.PUBLIC_EMAILJS_SERVICE_ID as string,
        import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID as string,
        formRef.current,
      );
      setStatus("sent");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 max-w-xl"
    >
      <div className="form-group">
        <label className="form-label" htmlFor="contact-name">
          Nome
        </label>
        <input
          id="contact-name"
          className="form-input"
          type="text"
          name="from_name"
          required
          placeholder="Seu nome"
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="contact-email">
          Email
        </label>
        <input
          id="contact-email"
          className="form-input"
          type="email"
          name="reply_to"
          required
          placeholder="seu@email.com"
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="contact-message">
          Mensagem
        </label>
        <textarea
          id="contact-message"
          className="form-textarea"
          name="message"
          required
          placeholder="Olá, gostaria de..."
        />
      </div>

      {status === "sent" && (
        <p style={{ color: "var(--color-tone-success)", fontSize: "0.875rem" }}>
          Mensagem enviada! Retornarei em breve.
        </p>
      )}
      {status === "error" && (
        <p style={{ color: "var(--color-tone-danger)", fontSize: "0.875rem" }}>
          Erro ao enviar. Tente novamente ou use o email diretamente.
        </p>
      )}

      <button
        type="submit"
        className="btn-primary self-start"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  );
}
