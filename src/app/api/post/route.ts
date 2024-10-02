import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {


    const res = await fetch('https://dragonball-api.com/api/characters', {
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const characters = await res.json();

    return NextResponse.json({
        message: 'GET: Hello from Next.js!',
        characters,
    }, { status: 200 })
}

export async function POST(request: NextRequest) {

    const data = await request.json()
    console.log('Received POST data:', data)

    return NextResponse.json({
        message: 'POST: Hello from Next.js!',
        data: data,
    }, { status: 200 })
}

