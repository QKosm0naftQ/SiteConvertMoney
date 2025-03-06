const LoadValue = (path) => {
    axios.get(path)
        .then(resp => {
            const { data, status } = resp;
            console.log("Resp status:", status);

            const exchangeRates = data;  

            const btn = document.getElementById("bt_convert");
            btn.onclick = () => {
                const from = document.querySelector("select[name='currency_from']").value; 
                const to = document.querySelector("select[name='currency_to']").value;  
                const rate = exchangeRates.find(rate => rate.ccy === to && rate.base_ccy === from);
                if (rate) {
                    const amount = parseFloat(document.getElementById("amount_from").value); 

                    if (isNaN(amount)) {
                        alert("Будь ласка, введіть правильну кількість.");
                        return;
                    }

                    const convertedAmount = amount * rate.buy; 
                    document.getElementById("amount_to").innerHTML = `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
                } else {
                    alert("Курс не знайдено для цієї пари валют.");
                }
            }
        })
        .catch(error => {
            console.error("Error loading currency data", error);
        });
}
