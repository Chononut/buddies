import { Button, Container, Row, Col } from "react-bootstrap";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import { useContext, useState} from "react";

export default function BadgerBudsBasket(props) {
    const buds = useContext(BadgerBudsDataContext)

    console.log("Buds from context", buds)
    //当给useState传入的默认值为回调函数时，React 会认为这是“懒加载初始化逻辑”。因此只在状态首次初始化时执行这个函数，不会每次渲染都计算useState里面的结果 
    //如果没有空数组 当没有存储的键值对时 getItem返回null会报错
    const [savedCatsIds, setSavedCatsIds] = useState(() => JSON.parse(sessionStorage.getItem('savedCatsIds') || "[]"))
    const [adoptedCatsIds, setAdoptedCatsIds] = useState(() => JSON.parse(sessionStorage.getItem('adoptedCatsIds') || "[]"))

    //调试时发现问题， 一开始下面的打印语句 打印出来的是Id数组
    //但是在状态改变重新渲染时 打印出来的是对象数组 所以导致状态改变后，savedCats变成了空数组 
    console.log("Initial saved cats",savedCatsIds)
    //获取在Available页面保存的,是一个对象数组
    const savedCats = buds.filter(bud => savedCatsIds.includes(bud.id) ) // || adoptedCatsIds.includes(bud.id))
    console.log("Cats on basket",savedCats)

    const unselectCat = (catName, catId) => {
        alert(`${catName} has been removed from your basket!`)
        console.log("Unselecting catId", catId)
        const updatedSavedCatsIds = savedCats.filter(savedCat => savedCat.id !== catId).map(savedCat => savedCat.id)
        console.log("UpdatedCatsId",updatedSavedCatsIds)
        sessionStorage.setItem('savedCatsIds', JSON.stringify(updatedSavedCatsIds))
        setSavedCatsIds(updatedSavedCatsIds)
    }

    const adoptCat = (catName, catId) => {
        alert(`${catName} has been adopted!`)
        const updatedAdoptedCatsIds = [...adoptedCatsIds, catId]
        console.log("adoptedCatsIds", updatedAdoptedCatsIds)
        //因为使用savedCats数组渲染页面 adoptCatsIds只是将adopt的猫存储在一个变量中
        sessionStorage.setItem('adoptedCatsIds', JSON.stringify(updatedAdoptedCatsIds))
        setAdoptedCatsIds(updatedAdoptedCatsIds)
        
        const updatedSavedCatsIds = savedCats.filter(savedCat => savedCat.id !== catId).map(savedCat => savedCat.id)
        //等待外部函数执行完成后 才会重新渲染组件 只是将状态更新任务放在一个队列 不会马上生效
        //react通过虚拟DOM和diff只会重新渲染被影响到的部分 所以下面的setState语句不多余
        setSavedCatsIds(updatedSavedCatsIds)
        sessionStorage.setItem('savedCatsIds', JSON.stringify(updatedSavedCatsIds))
        alert(`Thank you for adopting ${catName}`)
    }

    if (buds.length === 0){
        return <p>Loading Badger Buds in Basket...</p>
    }

    return <div>
        <h1>Badger Buds Basket</h1>
        <p>These cute cats could be all yours!</p>
        <Container>
            <Row>
                {savedCats.length === 0 ? (
                    <p>No buddies in your basket!</p>
                ) : (
                    savedCats.map(savedCat => (
                        <Col key={savedCat.id} xs={12} md={6} lg={4}>
                            <div className="showMore">
                                <img src={`https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${savedCat.imgIds[0]}`} alt={`A picture of ${savedCat.name}`} className="img-fluid" />
                                <h3>{savedCat.name}</h3>
                                <Button variant="secondary" onClick={() => {
                                    console.log("Unselect button clicked", savedCat.id)
                                    unselectCat(savedCat.name, savedCat.id)
                                }}>
                                    Unselect
                                </Button>{" "}
                                <Button variant="success" onClick={() => adoptCat(savedCat.name, savedCat.id)}>
                                    Adopt
                                </Button>
                            </div>
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    </div>
}
/*
1
页面是一链组件 所以选择使用数组
组件完成交互时 页面要重新渲染 所以选择useState钩子
2
通过sessionStorage完成各组件之间的数据传递
3
页面出现异常时 使用console.log进行调试
console.log变量 重点关注打印出来的数据类型 一开始按一个按钮后 页面所有组件消失 就是因为变量的数据类型改变了
当有 交互属性时 对交互属性的变量进行打印 如这里的unselect Button
 */