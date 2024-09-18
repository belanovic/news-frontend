import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import {context} from './newsContext.js';
import dateFormat from './dateFormat.js';
import shortenSentence from './shortenSentence.js';
import GenericThumb from './GenericThumb';
import './style/custom.css';  


export default function Custom({customX}) {

    const {frontpageNews} = useContext(context);

    const defaultSetup = {
        caption: {
            text: 'Default naslov',
            size: 3,
            color: '#ffffff',
            background: 'black',
            align: 'center'
        },
        body: {
            firstArticlePosition: 15,
            count: 8,
            paddingTop: 1,
            paddingSides: 4,
            background: '#000000'
        },
        article: {
            title: {
                color: '#ffffff'
            },
            subtitle: {
                show: true,
                color: '#ffffff'
            },
            supertitle: {
                color: '#ffffff',
                background: [180, '#970000', '#000000'],
                deg: 180
            },
            readMore: {
                show: true,
                color: '#ffffff',
                background:'#7a0000'
            }
        }
    }
    const [custom, setCustom] = useState(customX);


    function calculateFlexProperty() {
        if(custom.body.count < 6) {
            return `0 0 ${100 / custom.body.count - 1}%`
        }
        if((custom.body.count > 5) && (custom.body.count < 11)) {
            return `0 0 ${200 / custom.body.count - 1}%`
        }
        if((custom.body.count > 10) && (custom.body.count < 16)) {
            return `0 0 ${300 / custom.body.count - 1}%`
        }
    }

    function calculateFontSize(type) {
        let typeCoefficient;

        if(type == 'title') {typeCoefficient = 7}
        if(type == 'supertitle') {typeCoefficient = 4}
        if(type == 'subtitle') {typeCoefficient = 5}
        if(type == 'category') {typeCoefficient = 4}
        if(type == 'date') {typeCoefficient = 4}
        if(type == 'read-more') {typeCoefficient = 4}

        if(custom.body.count == 1) {
            return typeCoefficient / 2.5 + 'rem';
        }
        if(custom.body.count % 5 == 0) {
            return typeCoefficient / 4 + 'rem'
        }
        if(custom.body.count < 5) {
            return typeCoefficient / custom.body.count + 'rem'
        }
        if((custom.body.count > 5) && (custom.body.count < 11)) {
            return typeCoefficient / (custom.body.count/2) + 'rem'
            } 
        if((custom.body.count > 10) && (custom.body.count < 16)) {
            return typeCoefficient / (custom.body.count/3) + 'rem'
        }
    }

    const formatCathegory = (category) => {
        if (category === 'politics') return 'Politika'
        if (category === 'business') return 'Ekonomija'
        if (category === 'technology') return 'Tehnologija'
        if (category === 'entertainment') return 'Magazin'
        if (category === 'sports') return 'Sport'
    }

    function createFilter(filter) {
        if (filter) {
           return `blur(${filter[0].blur}px) brightness(${filter[0].brightness}%) 
                            contrast(${filter[0].contrast}%) grayscale(${filter[0].grayscale}%) 
                            hue-rotate(${filter[0].huRotate}deg) invert(${filter[0].invert}%) 
                            opacity(${filter[0].opacity}%) saturate(${filter[0].saturate}%) 
                            sepia(${filter[0].sepia}%)`
        } else {
            return 'none'
        }
    }

    return ( custom && 
        <div 
            className= 'custom'
            style={{
                borderTop: `${custom.border.borderTop.px}px ${custom.border.borderTop.stil} ${custom.border.borderTop.color}`,
                borderBottom: `${custom.border.borderBottom.px}px ${custom.border.borderBottom.stil} ${custom.border.borderBottom.color}`,
                borderLeft: `${custom.border.borderLeft.px}px ${custom.border.borderLeft.stil} ${custom.border.borderLeft.color}`,
                borderRight: `${custom.border.borderRight.px}px ${custom.border.borderRight.stil} ${custom.border.borderRight.color}`,
                borderRadius: `${custom.border.borderRadius.topLeft}% ${custom.border.borderRadius.topRight}% ${custom.border.borderRadius.bottomLeft}% ${custom.border.borderRadius.bottomRight}%`
            }}
        >
            <div 
                className='custom-title'
                style={{
                    fontSize: `${custom.caption.size}rem`,
                    padding: '0.5em 0.5em 0.5em 0.5em',
                    color: custom.caption.color,
                    background: custom.caption.background,
                    textAlign: custom.caption.align
                }}
            >{custom.caption.text}
            </div>
            <div 
                className='custom-articles'
                style = {{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: custom.body.count > 5? 'wrap' : 'nowrap',
                    backgroundColor: custom.body.background,
                    paddingTop: custom.body.paddingTop + 'em',
                    paddingLeft: custom.body.paddingSides + 'em',
                    paddingRight: custom.body.paddingSides + 'em',
                    paddingBottom: '0'
                }}
            >
                {frontpageNews && frontpageNews.map((article, i) => {

                if((i < custom.body.firstArticlePosition - 1) || (i > (custom.body.firstArticlePosition - 1) + (custom.body.count - 1))) return
                return <div 
                    className={`card card-custom ${i == custom.body.firstArticlePosition - 1? 'first' : ''}`}
                    style = {{
                        flex: calculateFlexProperty(),
                        position: 'relative',
                        display: custom.body.count == 1? 'flex' : 'block',
                        marginBottom: /* (i == custom.body.firstArticlePosition - 1) && custom.body.count > 5?  */'3em'
                    }}
                >
                    {article.supertitle && <div 
                        className={`card-custom-container-supertitle`}
                        style={{
                            position: 'absolute',
                            width: '100%',
                            top: '0px',
                            zIndex: 1
                            
                        }}
                    >
                        <div 
                            className={`card-custom-supertitle`}
                            style={{
                                display: 'inline-block',
                                padding: '0.3em 0.7em',
                                fontSize: calculateFontSize('supertitle'),
                                fontWeight: 'bold',                               
                                color: custom.article.supertitle.color,
                                background: `linear-gradient(${custom.article.supertitle.deg}deg, ${custom.article.supertitle.background[1]},${custom.article.supertitle.background[2]})`
                            }}
                        >{article.supertitle}
                        </div>
                    </div>}
                    {article.imgURL && <div 
                        className={`card-custom-container-img`}
                        style = {{
                            position: 'relative',
                            overflow: 'hidden',
                            flex: '0 0 60%'
                        }}
                    >
                        <Link 
                            style = {{
                                display: 'inline-block',
                                width: '100%',
                                height: '100%'
                            }} 
                            to={`/article/${article._id}`}
                        >
                            {article.videoURL && (article.videoURL !== 'none') && <div className="play"><i className="far fa-play-circle"></i></div>}
                            {(article.imgURL == 'generic')?
                                <GenericThumb 
                                    className={`card-img card-custom-img`}
                                    thumbShape = 'wide'
                                    category={article.category} 
                                    isCustom = {true}
                                />
                                :
                                <img className={`card-img card-custom-img`}
                                    style = {{
                                        width: '100%',
                                    
                                        objectFit: 'cover',
                                        filter: createFilter(article.imgFilter)
                                    }}
                                    src={article.imgURL}
                                >
                                </img>}
                        </Link>
                    </div>}
                    {(article.title || article.subtitle) && <div 
                        className={`card-custom-text`}
                        style={{
                            width: '100%',
                            padding: custom.body.count == 1?'1em 1em 1em 2em' : '1em 1em 1em 0em',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}
                    >
                        {article.title && <div className={`card-custom-container-title`}>
                            <Link to={`/article/${article._id}`}>
                                <div 
                                    className={`card-custom-title`}
                                    style={{
                                        marginBottom: custom.article.subtitle.show? '0.25em' : '1.25em',
                                        marginTop: '0em',
                                        color: custom.article.title.color,
                                        fontSize: calculateFontSize('title'),
                                        lineHeight: 1.25,
                                        letterSpacing: '1px',
                                        transition: 'color 0.25s'
                                        
                                    }}
                                >
                                    {shortenSentence(article.title, 170)}
                                </div>
                            </Link>
                        </div>}
                        {(article.category || article.datePublished || article.dateUpdated) && <div 
                            className={`card-custom-info`}
                            style={{
                                order: -1,
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '1em',
                                color: 'white'
                            }}
                        >
                            {article.category && <div 
                                className='card-info-category'
                                style={{
                                    display: 'inline-block'
                                }}
                            ><Link 
                                to={`/article/${article._id}`}
                                style={{
                                    color: 'rgb(61, 170, 237)',
                                    fontSize: calculateFontSize('category'),
                                    fontFamily: 'sans-serif, Arial, Helvetica',
                                    textTransform: 'uppercase'
                                }}
                            >{formatCathegory(article.category)} /
                            </Link> 
                            </div>}
                            <div 
                                className={`card-info-date`}
                                style = {{
                                    fontSize: calculateFontSize('date'),
                                    textTransform: 'capitalize',
                                    color: 'black'
                                    
                                }}
                            >
                                {article.datePublished && <span className="date datePublished" >
                                    {article.datePublished ? dateFormat(article.datePublished, 'clock', 'comma', 'month', 'dayMonth') : ''}
                                </span>}                            
                            </div>
                        </div>}
                        {custom.article.subtitle.show && <div className={`card-custom-container-subtitle`}>
                
                                <p
                                    className={`card-custom-subtitle`}
                                    style={{
                                        fontSize: calculateFontSize('subtitle'),
                                        color: custom.article.subtitle.color,
                                        lineHeight: 1.5
                                    }}
                                >
                                    {shortenSentence(article.subtitle, 120)}
                                </p>
                        
                        </div>}
                        {custom.article.readMore.show && <div 
                            className='read-more'
                            style = {{
                                order: '2'
                            }}
                        > <Link 
                            to={`/article/${article._id}`}
                            style = {{
                                display: 'inline-block',
                                padding: '0.5em 2em 0.5em 2em',
                                background: custom.article.readMore.background,
                                transition: 'all 0.25s',
                                color: custom.article.readMore.color,
                                fontSize: calculateFontSize('read-more')
                            }}
                        >Pročitaj</Link>
                        </div>}
                    </div>}
                </div>
                })}
            </div>
        </div>
    )
}