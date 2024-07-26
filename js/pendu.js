const app = Vue.createApp({

    data() {
        return {
            /* -- OBJECT PROPERTY -- */

            /* -- ETAPE 1 -- */
            isUserREgistered: false, /* le user a t'il indiqué son nom */
            username: "",

            /* -- ETAPE 2 -- */
            isGameActive: false,

            /* -- ETAPE 3 -- */
            alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''),

            wordToFind: "",
            arrayWord: ['coucou', 'salut', 'hello'],

            cptErrorMin: 0,
            cptErrorMax: 6,

            selectLetter: "",
            goodLetters: [],
            badLetters: [],

            gameOver: false,
        }
    },

    methods: {
        /* -- Les méthodes sont appelées LORS D'UNE ACTION, d'un évènt = @click / hover / ... -- */
        connexionUser() {
            if (this.username === "") return;
            this.isUserREgistered = true;
        },

        startGame() {
            this.isGameActive = true;
            this.wordToFind = this.arrayWord[Math.floor(Math.random() * this.arrayWord.length)];
            this.goodLetters = [];
            this.badLetters = [];
            this.cptErrorMin = 0;
            this.gameOver = false;
        },

        selectedLetter(letter) {
            this.selectLetter = letter.toLowerCase();
        },

        checkSelectedLetter() {
            if (this.selectLetter === "" || this.selectLetter.length !== 1) return;
            if (this.goodLetters.includes(this.selectLetter) || this.badLetters.includes(this.selectLetter)) return;
            if (this.wordToFind.includes(this.selectLetter)) {
                this.goodLetters.push(this.selectLetter);
            } else {
                this.badLetters.push(this.selectLetter);
                this.cptErrorMin++;
                this.checkGamesOver();
            }
            this.selectLetter = '';
        },

        checkGamesOver() {

        },
    },


    computed: {
        /* -- Fonctionne comme une variable dynamique pour alléger le processur (serveur) -- */
        recomposedWord() {
            return this.wordToFind
                .split('')
                .map(letter => (this.goodLetters.includes(letter) ? letter : '*'))
                .join('');
        }
    },


    mounted() {
        /* -- Lors du premier chargement, il va exécuter comme une méthode sans action, sans évents, ... -- */
    }


}).mount('#app')