class TokenService {
    static instance: TokenService
    #accessToken: null | string = null

    private constructor() {}

    static getInstance(): TokenService {
        if (!TokenService.instance) {
            TokenService.instance = new TokenService()
        }
        return TokenService.instance
    }

    setToken(token: string) {
        this.#accessToken = token
    }

    getToken(): string | null {
        return this.#accessToken
    }

    resetToken() {
        this.#accessToken = null
    }
}

export const accessToken = TokenService.getInstance()
