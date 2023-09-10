import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import {Card, Row, Col, Input} from 'antd'
import millify from "millify"
import {useGetCoinsQuery} from "../services/cryptoApi"

const Cryptocurrencies = ({ simplified }) => {

    const count = simplified ? 10 : 100;

    const {data: cryptoList, isFetching} = useGetCoinsQuery(count);

    const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const filtered = cryptoList?.data.coins.filter((coin) => coin?.name?.toLowerCase().includes(searchTerm.toLowerCase()));

        setCryptos(filtered);
    }, [cryptoList, searchTerm]);

    function handleOnChange(event){
        const value = event.target.value;
        setSearchTerm(value);
    }

    if(isFetching) return "Loading...";

    return (
        <>
            {!simplified && (
                <div className='search-crypto'>
                    <Input placeholder="Search Crypto..." onChange={handleOnChange} />
                </div>
            )}
            <Row gutter={[36, 36]} className="crypto-card-container">
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card">
                        <Link to={`/crypto/${currency.uuid}`}>
                            <Card key={currency.uuid}
                                  hoverable
                                  title={`${currency.rank}. ${currency.name}`}
                                  extra={<img className="crypto-image" src={currency.iconUrl}/>}>
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies