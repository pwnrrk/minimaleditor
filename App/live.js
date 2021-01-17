//Live Html Feature
//Hotfix
import { Console } from "./Controller/Console.js"
import { ObjectHelper } from "./Helper/Object.helper.js"

const url = new URLSearchParams(window.location.search)
let files = JSON.parse(localStorage.getItem('files'))
let content = ObjectHelper.find('id', url.get('file'), files).content
const type = {
    html: () => {
        window.document.write(content)
    },
    markdown: () => {
        window.document.write(`
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="./Style/index.css">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400&display=swap" rel="stylesheet">
        <div class="container markdown">${marked(content)}</div>
        `)
        document.body.style.overflow = 'auto'
    },
    js: () => {
        window.document.write(`
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="./Style/index.css">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400&display=swap" rel="stylesheet">
        <div id="console"><h3>Output:</h3></div>
        <script>
                ${content}
        </script>
        `)
        const consoleElment = document.getElementById('console')
        Console.init(consoleElment)
        document.body.style.overflow = 'auto'
        document.body.classList.add('bg-dark')
    }
}
window.addEventListener('load', type[url.get('type')])
