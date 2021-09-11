const slides = [
    {
        title: 'React is Declarative',
        bullets: [
            "Imperative vs. Declarative",
            "Browser APIs aren't fun to work with",
            "React allows us to write what we want and let the library handle the DOM manipulation"
        ]
    },
    {
        title: 'Slide #2',
        bullets: [
            "A bullet",
            "Another bullet",
            "A third bullet"
        ]
    }
]

// Version 1
function createSlide(slide) {
    return (
        <Slide>
            <h1>slide.title</h1>
            <ul>
                {slide.bullets.map(bullet => <li>{bullet}</li>)}
            </ul>
        </Slide>
    )
}

// Version 2
const Slide = slide => (
    <div>
        <h1>{slide.title}</h1>
        <ul>
            {slide.bullets.map(bullet => <li>{bullet}</li>)}
        </ul>
    </div>
)

// Build the slideshow using version 2
const slideShow = (
    <div>
        {slides.map(slide => <Slide slide={slide}></Slide>)}
    </div>
)