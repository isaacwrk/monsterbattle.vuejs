new Vue({
    el:"#app",
    data:{
        running:false,
        playerLife:100,
        monsterLife:100,
        
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
    },
    attack(especial){
        this.hurt('playerLife',7,12,false)
        this.hurt('monsterLife',5,10,especial)
    },
    hurt(atr,min,max,especial){
        const plus = especial ? 5 : 0 
        const hurt = this.getRandom(min + plus, max + plus)
        //evitando que o o life do jogador fique negativo, sendo que o valor minimo aceitável seja 0
        this[atr] = Math.max(this.playerLife - hurt, 0)
    },
    getRandom(min,max){
        //gerando um valor entre 0 1 multiplicando o valor pelo máximo menos o minimo
        const value = Math.random() * (max - min) + min
        return Math.round(value)
        }
    },
    watch:{
        hasResult(value){
            if(value) this.running = false
        }
    }
})