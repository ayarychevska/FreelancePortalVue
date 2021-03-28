import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({ namespaced: true })
export default class WebSocketStore extends VuexModule {
    public connection: WebSocket = null;
    public connected = false;

    @Mutation
    establishConnection(userId) {
        this.connected = false;
        console.log('We are trying to establish WS connection...');
        this.connection = new WebSocket(`wss://localhost:5001/ws?id=${userId}`)
        console.log('WS connection has been established', this.connection);
        this.connected = true;
    }

    @Mutation
    confirmOpen() {
        this.connected = true;
    }

    @Mutation
    attachHandler(handler) {
        console.log('Setting handler...');
        this.connection.onmessage = handler;
    }

    @Action({ rawError: true })
    async connect(): Promise<boolean> {
        try {
            this.context.commit('establishConnection', this.context.rootState.auth.user.id);
            return true;
        }
        catch (err) {
            console.log("WS connection error", err);
            return false;
        }
    }

    @Action({ rawError: true })
    async sendMsg(msg: any): Promise<boolean> {
        try {
            if (this.connection == null) {
                this.context.commit('establishConnection', this.context.rootState.auth.user.id);
            }
            else {
                console.log("Connection is not null",);
            }

            const message = JSON.stringify(msg);
            console.log(message);

            if (this.connected == false) {
                console.log('Waiting for onopen');
                this.connection.onopen = () => {
                    this.connection.send(message);
                    console.log("opened");
                }
                this.context.commit('confirmOpen');
            }
            else {
                console.log('Sending instantly');
                this.connection.send(message);
            }

            return true;
        }
        catch (err) {
            console.error("WS message sending error", err);
            return false;
        }
    }

    @Action({ rawError: true })
    async setHandler(handler: any) {
        if (this.connection == null) {
            this.context.commit('establishConnection', this.context.rootState.auth.user.id);
        }

        this.context.commit('attachHandler', handler);
    }
}
