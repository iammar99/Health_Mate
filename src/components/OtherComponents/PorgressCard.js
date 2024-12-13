import React from 'react'

export default function PorgressCard(props) {
    return (
        <div class="card-container">
            <div class="card-content">
                {Math.ceil(props.score)}/100
            </div>
            <div class="card-blur"></div>
        </div>

    )
}
