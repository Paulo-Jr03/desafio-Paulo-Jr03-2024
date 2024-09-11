class Recinto {
    constructor(id, bioma, capacidadeTotal, espaçoTotal, animais = []) {
        this.id = id;
        this.bioma = bioma;
        this.capacidadeTotal = capacidadeTotal;
        this.espaçoTotal = espaçoTotal;
        this.animais = animais; 
    }
}

class RecintosZoo {
    constructor() {
        this.recintos = [
            new Recinto("Recinto 1", "savana", 10, 7, ["MACACO"]),
            new Recinto("Recinto 2", "floresta", 5, 5, ['']),
            new Recinto("Recinto 3", "savana e rio", 7, 5, ["GAZELA"]),
            new Recinto("Recinto 4", "rio", 8, 8, []),
            new Recinto("Recinto 5", "savana", 9, 6, ["LEAO"])
        ];
    }

    verificarRecintosViaveis(animal, quantidade) {
        const requisitos = {
            LEAO: 3,
            LEOPARDO: 2,
            CROCODILO: 3,
            MACACO: 1,
            GAZELA: 2,
            HIPOPOTAMO: 4
        };

        if (!requisitos[animal]) {
            return { erro: "Animal inválido" };
        }

        const valorAnimal = requisitos[animal];
        let recintosViaveis = [];

        for (let i = 0; i < this.recintos.length - 1; i++) {
            const recinto = this.recintos[i];
            const necessidadeEspaco = valorAnimal * quantidade;
            const capacidadeLivre = recinto.espaçoTotal - necessidadeEspaco;
            const possuiOutroAnimal = recinto.animais.length > 0;
            const biomaValido = this.biomaAdequado(recinto, animal);

            
            const animaisCarnivoros = ["LEAO", "LEOPARDO", "CROCODILO"];
            const possuiCarnivoros = recinto.animais.some(a => animaisCarnivoros.includes(a));
            const espaçoExtra = recinto.animais.length > 0 && !recinto.animais.includes(animal) && !recinto.animais.includes('')? 1 : 0;
            const possuiOutrasEspecies = recinto.animais.some(a => a !== animal && !animaisCarnivoros.includes(a));
            const result = capacidadeLivre - espaçoExtra;
            if (animaisCarnivoros.includes(animal) && (possuiOutrasEspecies || (possuiCarnivoros && !recinto.animais.every(a => a === animal)))) {
                continue; 
            }

           
            

            if (biomaValido && capacidadeLivre - espaçoExtra >= 0) {
                
                if (animal === "MACACO" && quantidade > 1 && !possuiOutroAnimal) {
                    continue; 
                }

                recintosViaveis.push(`${recinto.id} (espaço livre: ${result} total: ${recinto.capacidadeTotal})`);
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };
    }

    biomaAdequado(recinto, animal) {
        switch (animal) {
            case "LEAO":
            case "LEOPARDO":
            case "GAZELA":
                return recinto.bioma.includes("savana");
            case "CROCODILO":
                return recinto.bioma.includes("rio");
            case "HIPOPOTAMO":
                return recinto.bioma.includes("savana") && recinto.bioma.includes("rio");
            case "MACACO":
                return recinto.bioma.includes("savana") || recinto.bioma.includes("floresta");
            default:
                return false;
        }
    }

    analisaRecintos(animal, quantidade) {
        if (quantidade > 0) {
            return this.verificarRecintosViaveis(animal, quantidade);
        } else {
            return { erro: "Quantidade inválida" };
        }
    }
}


export { RecintosZoo as RecintosZoo};
