import React from 'react'
// import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
const SliderData = [
    {
        image: "./assets/farming2.jpg",
        title: "Organic Food",
        desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum esse repellendus earum corporis hic, optio magnam, eveniet quod, repellat quos "
    },
]

const Slider = () => {
  return (
    <div class="Container">
              <div class="Wrapper">
                {SliderData.map((item) => (
                  <div class="Slide">
                      <div class="ImgContainer">
                          <img class="Image" alt="landing" src={item.image} />
                      </div>
                      <div class="InfoContainer">
                          <div class="Titlt">{item.title}</div>
                          <div class="Desc">{item.desc}</div>
                      </div>
                  </div>
                ))}
              </div>
              </div>
  )
}

export default Slider