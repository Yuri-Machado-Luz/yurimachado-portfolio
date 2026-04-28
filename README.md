<div align="center" >

<div class="glitch-wrapper">
   <div class="glitch" data-text="Main Portfolio">Main Portfolio</div>
</div>
<div class="wrapper">
    <svg>
        <text x="50%" y="50%" dy=".35em" text-anchor="middle">
            Under Development
        </text>
    </svg>
</div>

[![Built Starlight](https://astro.badg.es/v2/built-with-starlight/large.svg)](https://starlight.astro.build)

</div>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Traditional+Nushu&display=swap");

svg {
    font-family: "Noto Traditional Nushu", sans-serif;
    width: 100%;
    height: 100%;
}

svg text {
    animation: stroke 5s infinite alternate;
    stroke-width: 2;
    stroke: #CB2B0D;
    font-size: 3rem;
}

@keyframes stroke {
    0% {
        fill: rgba(255,0,0,0);
        stroke: rgba(203,43,13,1);
        stroke-dashoffset: 25%;
        stroke-dasharray: 0 50%;
        stroke-width: 2;
    }
    70% {
        fill: rgba(255,0,0,0);
        stroke: rgba(203,43,13,1);
    }
    80% {
        fill: rgba(255,0,0,0);
        stroke: rgba(203,43,13,1);
        stroke-width: 3;
    }
    100% {
        fill: rgba(255,0,0,1);
        stroke: rgba(203,43,13,0);
        stroke-dashoffset: -25%;
        stroke-dasharray: 50% 0;
        stroke-width: 0;
    }
}

.wrapper {
}

.glitch-wrapper {
   width: 100%;
   height: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   text-align: center;
   background-color: #000000;
}

.glitch {
   position: relative;
   font-size: 2rem;
   font-weight: bold;
   color: #FFFFFF;
   letter-spacing: 3px;
   z-index: 1;
}

.glitch:before, .glitch:after {
   display: block;
   content: attr(data-text);
   position: absolute;
   top: 0;
   left: 0;
   opacity: 0.8;
}

.glitch:before {
   animation: glitch-it 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
   color: #00FFFF;
   z-index: -1;
}

.glitch:after {
   animation: glitch-it 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
   color: #FF0001;
   z-index: -2;
}

@keyframes glitch-it {
   0% { transform: translate(0); }
   20% { transform: translate(-2px, 2px); }
   40% { transform: translate(-2px, -2px); }
   60% { transform: translate(2px, 2px); }
   80% { transform: translate(2px, -2px); }
   to { transform: translate(0); }
}
</style>
