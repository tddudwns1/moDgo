import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { customMedia } from "../../GlobalStyles";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import banner1 from "../../images/netflix.png";
import banner2 from "../../images/wave.png";
import banner3 from "../../images/watchaplay.png";
import banner4 from "../../images/disneyplus.png";

export default class ImageSlider extends Component {
    render() {
        const settings = {
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 3000,
            dots: true,
        };
        return (
            <Wrapper>
                <StyledSlider {...settings}>

                    <Image onClick={() => window.open('https://www.netflix.com/kr/', '_blank')} src={banner1}></Image>
                    <Image onClick={() => window.open('https://www.wavve.com/', '_blank')} src={banner2}></Image>
                    <Image onClick={() => window.open('https://watcha.com/', '_blank')} src={banner3}></Image>
                    <Image onClick={() => window.open('https://www.preview.disneyplus.com/ko-kr', '_blank')} src={banner4}></Image>

                </StyledSlider>
            </Wrapper>
        );
    }
}
const Wrapper = styled.section`
    margin : 0 auto;
    width : 1200px;
    height : 300px;
    
    ${customMedia.lessThan("mobile")`
        display : none;
    `}

    ${customMedia.between("mobile", "largeMobile")`
        display : none;
    `}

    ${customMedia.between("tablet", "desktop")`
        width : 880px;
        height : 152.5px;
    `}

    ${customMedia.between("tablet", "desktop")`
    width: 880px;
    height:220px;
    `}

    `;

const StyledSlider = styled(Slider)`
	.slick-prev:before,
	.slick-next:before {
		color: #029400;
		margin: 0 auto;
	}
	.slick-slider {
		width: 100%;
    height: 300px;
    
    ${customMedia.lessThan("mobile")`
      display: none;
    `}
    ${customMedia.between("mobile", "largeMobile")`
      display: none;
    `}
    ${customMedia.between("largeMobile", "tablet")`
      height: 152.5px;
    `}
    ${customMedia.lessThan("desktop")`
      height: 220px;
    `}
	}
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
`;
