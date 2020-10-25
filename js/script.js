let seuVotoPara = document.querySelector(".d-1-1 span")
let cargo = document.querySelector(".d-1-2 span")
let descricao = document.querySelector(".d-1-4")
let aviso = document.querySelector(".d-2")
let lateral = document.querySelector(".d-1-right")
let numeros = document.querySelector(".d-1-3")

let etapaAtual = 0
let numero = ""
let votoEmBranco = false

function comecarEtapa() {
    let etapa = etapas[etapaAtual]

    let numeroHtml = ''
    numero = ''
    votoEmBranco = false

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>'
        }
        else {
            numeroHtml += '<div class="numero"></div>'
        }
    }

    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = ""
    aviso.style.display = 'none'
    lateral.innerHTML = ''
    numeros.innerHTML = numeroHtml
}

function atualizarInterface() {
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true 
        } else {
            return false
        }
    })
    if (candidato.length > 0) {
        candidato = candidato[0]
        seuVotoPara.style.display = 'block'
        descricao.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}`
        
        let fotosHtml = ''
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small">
                <img src="./images/${candidato.fotos[i].url}" alt="Prefeito">
                <div class="titulo">${candidato.fotos[i].legenda}</div>`
            } else {

                fotosHtml += `<div class="d-1-image">
                <img src="./images/${candidato.fotos[i].url}" alt="Prefeito">
                <div class="titulo">${candidato.fotos[i].legenda}</div>`
            }
        }

        lateral.innerHTML = fotosHtml
    }
    else {
        seuVotoPara.style.display = 'none'
        aviso.style.display = 'none'
        descricao.innerHTML = '<div class=aviso-grande pisca>VOTO NULO</div>'
    }
}

function clicou(n) {
    let elNumero = document.querySelector(".numero.pisca")
    if (elNumero !== null) {
        elNumero.innerHTML = n
        numero = `${numero}${n}`

        elNumero.classList.remove("pisca")
        let proximoElNumero = elNumero.nextElementSibling
        if (proximoElNumero !== null) {
            proximoElNumero.classList.add("pisca")
        } else {
            atualizarInterface()
        }
    }
}

function branco() {
    if (numero === '') {
        votoEmBranco = true
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        numeros.innerHTML = ''
        descricao.innerHTML = '<div class=aviso-grande pisca>VOTO EM BRANCO</div>'
    } else {
        alert("O campo de voto deve estar vazio, aperte CORRIGE para apagar o campo de voto.")
    }
}

function corrige() {
    comecarEtapa()
}

function confirma() {
    let etapa = etapas[etapaAtual]
    let votoConfirmado = false
    if (votoEmBranco) {
        votoConfirmado = true
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true
    }

    if (votoConfirmado) {
        etapaAtual++
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa()
        } else {
            document.querySelector('.tela').innerHTML = `<div class='aviso-gigante pisca'>
            Fim!</div>`
        }
    }
}

comecarEtapa()