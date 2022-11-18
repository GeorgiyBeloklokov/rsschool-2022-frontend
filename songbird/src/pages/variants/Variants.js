
  


export default class Variants  {
  constructor(variants, roundClear, checkAnswer) {
    this.variants = variants.map(el => el.name);
    this.roundClear = roundClear;
    this.checkAnswer = checkAnswer;
  }
  init() {
   
    
    let ul = document.createElement('ul');
    ul.classList.add('variants-block');
    document.body.append(ul);
    this.variants.map((item, index) => {
      let li = document.createElement('li');
      li.innerHTML = item;
      ul.append(li);
      let span = document.createElement('span');
      span.classList.add('dot');
      span.innerHTML = '•';
      li.append(span);
      
      
      
     
      

    })
    
    return ul;
    
  }
};


/* export default class Variants  {
  createVariants(){
    const roundClear=this.props.roundClear
    const variants = this.props.variants.map(el=>el.name);
    return variants.map((item, index) => 
      <li onClick={(e) => {this.props.checkAnswer(index, e)}}><span key={index} className={`${roundClear ? 'dot-wrong' : 'dot'}`}>•</span>{item}</li>
      ) 
    }
  render() {
    return (
      <ul  className='variants-block' >
        {this.createVariants()}
      </ul>
    );
  }
} */