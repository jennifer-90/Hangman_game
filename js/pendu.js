const app = Vue.createApp({
    data() {
        return {
            /* -- OBJECT PROPERTY -- */

            /* -- ETAPE 1 -- */
            isUserRegistered: false, /* le user a t'il indiqué son nom */
            username: "",

            /* -- ETAPE 2 -- */
            isGameActive: false,

            /* -- ETAPE 3 -- */
            alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''),

            wordToFind: "",
            categoryNow: "",

            arrayWord: {
                'ANIMAUX': ['chat', 'chien', 'elephant', 'girafe', 'lion', 'tigre', 'souris', 'cheval', 'mouton', 'requin'],
                'PAYS': ['france', 'allemagne', 'italie', 'espagne', 'belgique', 'portugal', 'canada', 'bresil', 'japon', 'australie'],
                'FRUITS': ['pomme', 'banane', 'cerise', 'fraise', 'orange', 'citron', 'kiwi', 'raisin', 'mangue', 'ananas']
            },

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
            this.isUserRegistered = true;
        },

        startGame() {
            this.isGameActive = true;

            const categories = Object.keys(this.arrayWord);
            this.categoryNow = categories[Math.floor(Math.random() * categories.length)];

            const words = this.arrayWord[this.categoryNow];
            this.wordToFind = words[Math.floor(Math.random() * words.length)];

            this.goodLetters = [];
            this.badLetters = [];
            this.cptErrorMin = 0;
            this.gameOver = false;
        },

        selectedLetter(letter) {
            this.selectLetter = letter.toLowerCase();
            this.checkSelectedLetter();
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
            if (this.cptErrorMin >= this.cptErrorMax) {
                this.gameOver = true;
            }
        },
    },

    computed: {
        /* -- Fonctionne comme une variable dynamique pour alléger le processur (serveur) -- */
        recomposedWord() {
            return this.wordToFind
                .split('')
                .map(letter => (this.goodLetters.includes(letter) ? letter : ' _ '))
                .join('');
        }
    },

    mounted() {
        /* -- Lors du premier chargement, il va exécuter comme une méthode sans action, sans évents, ... -- */
    }
}).mount('#app');
