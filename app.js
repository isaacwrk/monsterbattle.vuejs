new Vue({
    el:"#app",
    data:{
        running:false,
        playerLife:100,
        monsterLife:100,
        logs:[]
        
    },
    computed:{
        hasResult(){
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods: {
        startGame(){
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
            this.logs = []
    },
    attack(especial){
        this.hurt('playerLife',7,12,false,'Monstro','Jogador','monster')
        if(this.monsterLife > 0){
            //quem é ferido com o ataque especial é o monstro
        this.hurt('monsterLife',5,10,especial,'Jogador','Monstro','player')
        }
        
    },
    /* entendendo os atributos da função
        source = quem atacou , target= alvo ,e cls = classe */
    hurt(atr,min,max,especial,source,target,cls){
        const plus = especial ? 5 : 0 
        const hurt = this.getRandom(min + plus, max + plus)
        //evitando que o o life do jogador fique negativo, sendo que o valor minimo aceitável seja 0
        this[atr] = Math.max(this.playerLife - hurt, 0)
        this.registerLog(`${source} atingiu ${target} com ${hurt}.`, cls)
    },
    //entende-se que ao usar o seu turno para se curar, o inimigo tem a oportunidade de atacar então, ao mesmo tempo que se cura, se é atacado
    healAndHurt(){
        this.heal(10,15)
        this.hurt('playerLife', 7,12, false, 'Monstro','Jogador','monster')
    },
    heal(min,max){
        const heal = this.getRandom(min, max)
        //evitando o que o heal do jogador ultrapasse 100
        this.playerLife = Math.min(this.playerLife + heal, 100)
        this.registerLog(`Jogador ganhou cura de ${heal}.`, 'player')
    },
    getRandom(min,max){
        //gerando um valor entre 0 1 multiplicando o valor pelo máximo menos o minimo
        const value = Math.random() * (max - min) + min
        return Math.round(value)
    },
    //unshift = sempre o logo mais recente vai ser o primeiro no array
    registerLog(text,cls){
        this.logs.unshift({ text, cls })
        }
    },
    watch:{
        hasResult(value){
            if(value) this.running = false
        }
    }
})