import React from 'react';

import {
    Card,
    CardHeader,
    CardBody,
    CardImg,
    CardTitle,
    Row,
    Col,
    Button
} from "reactstrap";
import Marquee from "react-fast-marquee";


export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            factorys: [
                { name: 'AAA factory', img: `${process.env.PUBLIC_URL}/static/Factory_A.JPG`, show: false, detail: [] },
                { name: 'BBB factory', img: `${process.env.PUBLIC_URL}/static/Factory_B.JPG`, show: false, detail: [] },
                { name: 'CCC factory', img: `${process.env.PUBLIC_URL}/static/Factory_C.JPG`, show: false, detail: [] },
                { name: 'DDD factory', img: `${process.env.PUBLIC_URL}/static/Factory_D.JPG`, show: false, detail: [] }
            ],
            data: [
                { "id": 0, "factory": "AAA factory", "teaType": "Black Tea", "details": "AAA Black" },
                { "id": 1, "factory": "BBB factory", "teaType": "Green Tea", "details": "BBB Green" },
                { "id": 2, "factory": "CCC factory", "teaType": "Oolong", "details": "CCC Oolong" },
                { "id": 3, "factory": "CCC factory", "teaType": "Black Tea", "details": "CCC Black" },
                { "id": 4, "factory": "AAA factory", "teaType": "Green Tea", "details": "AAA Green" },
                { "id": 5, "factory": "DDD factory", "teaType": "Green Tea", "details": "DDD Green" },
                { "id": 6, "factory": "BBB factory", "teaType": "Oolong", "details": "BBB Oolong" },
                { "id": 7, "factory": "CCC factory", "teaType": "Black Tea", "details": "CCC Green" }
            ],
            autoplay: true
        }
    }

    do_something = async () => {
        let { factorys, data } = this.state
        let factory
        data.forEach((ele) => {
            factory = factorys.find(elee => elee.name === ele.factory)
            if (factory !== undefined) {
                factory.detail.push(ele)
            }
        })
        this.setState({ factory: factory })
    }

    async componentDidMount() {
        await this.do_something()
    }



    render() {
        let { factorys, autoplay } = this.state

        return (
            <div className="content">
                <Marquee gradientColor={[]}  play={autoplay}>
                    <h3>Good Price, Good Tea, Good Health</h3>
                </Marquee>
                <Card className='initcard'>
                    <CardHeader>
                        <CardTitle tag="h2">夢想家 @數位科技</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            {factorys.map((ele, d) => {
                                return (
                                    <Col md={3} key={`factory ${d}`}>
                                        <Card className='initcard' onClick={() => {
                                            let { factorys } = this.state
                                            factorys[d].show = !factorys[d].show
                                            this.setState({ factorys: factorys })
                                        }}>
                                            <CardImg
                                                alt={ele.name}
                                                src={ele.img}
                                                top
                                                width="100%"
                                            />
                                            <CardHeader>
                                                <CardTitle tag="h3">{ele.name}</CardTitle>
                                            </CardHeader>
                                            {ele.show === true &&
                                                <CardBody>
                                                    {ele.detail.map((elee) => {
                                                        return (
                                                            <>
                                                                <li className='details'>TeaType: {elee.teaType} / Details: {elee.details}</li>
                                                            </>
                                                        )
                                                    })}
                                                </CardBody>
                                            }
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                        <Button type="primary" onClick={() => {
                            let { autoplay } = this.state
                            this.setState({autoplay: !autoplay})
                        }}>
                            {autoplay === false ? 'Enable' : 'Disable'}
                        </Button>
                    </CardBody>
                </Card>
            </div>
        )

    }

}