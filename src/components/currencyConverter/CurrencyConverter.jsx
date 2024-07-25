import { useState, useEffect } from "react";

import NbuService from "../../services/NbuService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "../currencyConverter/currencyConverter.scss";

const CurrencyConverter = () => {
    const [amountUAN, setAmountUAN] = useState(1);
    const [currencyList, setCurrencyList] = useState([]);
    const [rate, setRate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [amount, setAmount] = useState(0);
    const nbuService = new NbuService();

    useEffect(() => {
        updateCurrencylist();
    }, []);

    const updateCurrencylist = () => {
        nbuService
            .getAllExchange()
            .then(onSetCurrencyList)
            .catch(onError)
            .finally(() => setLoading(false));
    };

    const onSetCurrencyList = (currencyList) => {
        setAmount(currencyList[0].rate * amountUAN);
        setRate(currencyList[0].rate);
        setCurrencyList(currencyList);
    };

    const onError = (error) => {
        console.error("Error loading characters:", error);
        setError(true);
    };

    const countCurrency = (e) => {
        if (amountUAN === "") {
            alert("Будь ласка, введіть суму.");
            return;
        }
        setAmountUAN(amountUAN);
        setAmount(Number(e.target.value) * amountUAN);
        setRate(Number(e.target.value));
    };

    const renderItem = (currency) => {
        return (
            <option key={currency.cc} value={currency.rate}>
                {currency.cc} ({currency.txt})
            </option>
        );
    };

    const handleUANChange = (e) => {
        if (!Number.isNaN(Number(e.target.value))) {
            setAmountUAN(Number(e.target.value));
            setAmount(rate * Number(e.target.value));
        }
    };

    const handleCurrencyChange = (e) => {
        if (!Number.isNaN(Number(e.target.value))) {
            setAmount(Number(e.target.value));
            setAmountUAN(rate * Number(e.target.value));
        }
    };

    if (loading) {
        return <Spinner />;
    }
    if (error) {
        return <ErrorMessage />;
    }
    return (
        <div className="currency-converter">
            <div className="currency-converter__container">
                <label htmlFor="UAN" className="currency-converter__item">
                    Українська Гривня (UAN)
                </label>
                <input
                    name="UAN"
                    className="currency-converter__input"
                    value={amountUAN}
                    onChange={handleUANChange}
                />
                <select
                    name="currencies"
                    className="currency-converter__select"
                    onChange={countCurrency}
                    value={rate || "-"}
                >
                    {currencyList.map(renderItem)}
                </select>
                <input
                    name="UAN"
                    className="currency-converter__input"
                    value={amount}
                    onChange={handleCurrencyChange}
                />
            </div>
        </div>
    );
};

export default CurrencyConverter;
