export default {
    data: () => ({
    }),
    beforeCreate() {
    },
    beforeMount() {
    },
    mounted() {
        var clientBefore = new this.HttpClient('/whoami/');
        clientBefore.get();
    },
    activated() {
    },
    methods: {
        signin() {
            alert('Login Successed')
        }
    },
    watch: {
    }
}