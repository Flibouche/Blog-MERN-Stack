import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
    return (
        <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
            <div className='flex flex-col flex-1 justify-center'>
                <h2 className='text-2xl'>Want to learn more about my projects ?</h2>
                <p className='text-gray-500 my-2'>Checkout my GitHub if you want to discover a lot of projects that I made</p>
                <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                    <a href="https://github.com/Flibouche" target='_blank' rel='noopener noreferrer'>
                        Flibouche's GitHub
                    </a>
                </Button>
            </div>
            <div className="p-7 flex-1">
                <img src="https://dyma-images.s3.fr-par.scw.cloud/emails/javascript1200x628.png" />
            </div>
        </div>
    )
}

