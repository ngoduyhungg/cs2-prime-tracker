import type { Stats } from "../types/stats";
import { Card, Row, Col, Skeleton, Progress } from "antd";


type StatsProps = {
    stats: Stats | null;
}

function StatsCards({ stats } : StatsProps){
    
    return ( 
        <Row gutter={16}>
            <Col span={6} className="mt-6">
                <Card title="Prime Cost" className="h-full">{ stats 
                    ? <div className="text-2xl font-bold">
                        ${ stats.primeCost }</div>
                    : <Skeleton active/>}
                </Card>
            </Col>

            <Col span={6} className="mt-6">
                <Card title="Recovered" className="h-full">{ stats 
                    ? <div className="text-2xl font-bold">
                        ${ stats.recovered }</div>
                    : <Skeleton active/>}
                </Card>
            </Col>

            <Col span={6} className="mt-6">
                <Card title="Remaining" className="h-full">{ stats 
                    ? <div className="text-2xl font-bold">
                        ${ stats.remaining }</div>
                    : <Skeleton active/>}
                </Card>
            </Col>

            <Col span={6} className="mt-6">
                <Card title="Progress" className="h-full">{ stats 
                    ? <div className="text-2xl font-bold">
                        <div className="text-2xl font-bold mb-2">
                            { stats.progress }%
                        </div>
                        <Progress percent={ stats.progress } showInfo={ false } /></div>
                    : <Skeleton active/>}
                </Card>
            </Col>
        </Row>
    );
};

export default StatsCards;