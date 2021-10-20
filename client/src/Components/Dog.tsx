import React from 'react'
import Next from './Next'
import Picture from './Picture'
import Previous from './Previous'

const Dog = () => {
    return (
        <section id="dog">
            <nav>
                <a href="">
                    🐶
                </a>
            </nav>
            <div className="previous">
                <Previous/>
            </div>

            <div className="picture">
                <Picture />
            </div>

            <div className="next">
                <Next />
            </div>
        </section>
    )
}

export default Dog
