import React, { useState } from "react";
import {Button, Carousel} from "react-bootstrap";

//注意参数的数据类型，{}表示对象
//BadgerBudsSummary用以实现展示每只猫的组件
const BadgerBudSummary = ({cat, save}) => {
    //设置按钮状态
    const [showMore, setShowMore] = useState(false)

return (
    <div className="showMore">
        {showMore? 
            <div>
                {(cat.imgIds.length - 1)?
                <Carousel fade interval={3000}>
                    {cat.imgIds.map((imgId, index) => (
                        <Carousel.Item key = {index}>
                            <img
                            src = {`https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${cat.imgIds[index]}`}
                            alt = {`Img of ${cat.name} ${index}`}
                            className = "photo"></img>
                        </Carousel.Item>
                        ))}
                </Carousel>:
                <img
                className="photo"
                alt={"A picture of " + cat.name}
                src = {`https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${cat.imgIds[0]}`} 
                ></img>}
                <p><strong>Gender:</strong>{cat.gender}</p>
                <p><strong>Breed:</strong>{cat.breed}</p>
                <p><strong>Age:</strong>{cat.age}</p>
                {cat.description?
                <div>
                    <p><strong>Description:</strong></p>
                    <p className="description">{cat.description}</p>
                </div>
                :null}
            </div>: 
            <div className="showLess">
                <img 
                alt = {"A picture of " + cat.name} 
                src = {`https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${cat.imgIds[0]}`} 
                className = "photo"></img>
                <p><b>{cat.name}</b></p>
            </div>}

            <div className="buttonInAvail">
                <Button variant = "primary" onClick={() => setShowMore(!showMore)}>{showMore? "Show less" : "Show more  "}</Button>
                <Button variant = "secondary" onClick={() => save(cat.id, cat.name)}>save</Button>
            </div> 
    </div>
)
}

export default BadgerBudSummary;