const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
}

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
}

// rolar o dados com valore aleatórios
async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// sorteia o bloco de forma aleatória
async function getRandomBlock() {
    let random = Math.random();

    let result;
    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO"
            break;
    }
    return result;
}

async function logRollresult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2) {
    for (let index = 1; index <= 5; index++) {
        console.log(`🛑 Rodada ${index}`);

        // sortear bloco
        let block = await getRandomBlock();
        console.log(`O bloco sorteado foi ${block}`);

        // rolar dados - sortear numero aleatório
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // teste de habilidade
        let totalTestSkill1 = 0
        let totalTestSkill2 = 0

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;
            await logRollresult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollresult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
        }
        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;
            await logRollresult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollresult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
        }
        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;
            console.log(`${character1.NOME} confrontou com ${character2.NOME}!🥋`);
            await logRollresult(character1.NOME, "poder", diceResult1, character1.PODER);
            await logRollresult(character2.NOME, "poder", diceResult2, character2.PODER);
            if (powerResult1 > powerResult2) {
                if (character2.PONTOS > 0) {
                    console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto!`);
                    character2.PONTOS--;
                }
            }
            if (powerResult2 > powerResult1) {
                if (character1.PONTOS > 0) {
                    console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto!`);
                    character1.PONTOS--;
                }
            }
            if (powerResult2 === powerResult1) {
                console.log(`Confronto empatado! Nenhum ponto foi perdido!`);
            }
        }

        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS++;
        }
        console.log("--------------------------------------------------------");
    }
}

async function declareWinner(character1, character2) {
    console.log(`Resultado final:\n`);
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(os)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(os)`);
    if (character1.PONTOS > character2.PONTOS) {
        console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆 `);
    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆 `);
    } else {
        console.log(`A corrida terminou em empate!`);
    }
}

(async function main() {
    console.log(
        `Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
    )
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})()