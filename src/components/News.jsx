import React, {useState} from 'react'
import {useGetCryptoNewsQuery} from "../services/cryptoNewsApi"
import {useGetCoinsQuery} from "../services/cryptoApi"
import {Typography, Row, Avatar, Col, Card, Select} from "antd"
import moment from "moment"

const {Title, Text} = Typography;
const {Option} = Select;

const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

const News = ({simplified}) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');

    const {data: cryptoNews, isFetching} = useGetCryptoNewsQuery({
        newsCategory,
        count: simplified ? 6 : 12
    })

    const {data} = useGetCoinsQuery(100);

    if (!cryptoNews?.value) return "Loading...";

    return (

        <Row gutter={[24, 24]}>
            {
                !simplified && (
                    <Col span={24}>
                        <Select
                            showSearch
                            className="select-news"
                            placeholder="Select a Crypto"
                            optionFilterProp="children"
                            onChange={(value) => setNewsCategory(value)}
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        >
                            <Option value="Cryptocurrency">Cryptocurrency</Option>
                            {data?.data?.coins?.map((coin, i) => (
                                <Option value={coin?.name}>{coin?.name}</Option>
                            ))}
                        </Select>
                    </Col>

                )
            }
            {cryptoNews?.value?.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className="news-card">
                        <a href={news?.url} rel="noreferrer" target="_blank">
                            <div className="news-image-container">
                                <Title level={4} className="news-title">{news?.name}</Title>
                                <img style={{maxWidth: "200px", maxHeight: "100px"}}
                                     src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news"/>
                            </div>
                            <p>
                                {news?.description > 100
                                    ? `${news?.description?.substring(0, 100)} ...` : news?.description
                                }
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl || demoImage}/>
                                    <Text className="provider-name">{news?.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(news?.datePublished).startOf('ss').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News