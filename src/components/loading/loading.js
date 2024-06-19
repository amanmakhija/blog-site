import React from 'react'
import './loading.css'

export default function Loading() {
    return (
        <div>
            <div className='blog'>
                <div className='banner skeleton'></div>
                <div className='info'>
                    <div className='skeleton'></div>
                    <div className='skeleton'></div>
                    <div className='skeleton'></div>
                </div>
            </div>
        </div>
    )
}
