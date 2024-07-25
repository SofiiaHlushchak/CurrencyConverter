class NbuService {
    _apiBase =
        "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?jsonn";

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getAllExchange = async () => {
        return await this.getResource(`${this._apiBase}`);
    };
}

export default NbuService;
