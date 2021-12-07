export const authParams = {
    particles: {
        number: {
            value: 1000
        },
    },
}
export const params = {
    particles: {
        number: {
            value: 60,
            density: {
                enable: true,
                value_area: 800,
            },
        },
        color: {
            value: '#fff',
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#fff',
            },
            image: {
                width: 100,
                height: 100,
            },
        },
        opacity: {
            value: 0.4,
            random: true,
            anim: {
                enable: true,
                speed: 6,
                opacity_min: 0.1,
                sync: false,
            },
        },
        size: {
            value: 34,
            random: true,
            anim: {
                enable: true,
                speed: 7,
                size_min: 0.1,
                sync: false,
            },
        },
        line_linked: {
            enable_auto: true,
            distance: 100,
            color: '#fff',
            opacity: 1,
            width: 1,
            condensed_mode: {
                enable: false,
                rotateX: 600,
                rotateY: 600,
            },
        },
        move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
            },
        },
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
            },
            onclick: {
                enable: false,
            },
            resize: true,
        },
    },
    retina_detect: true,
}
