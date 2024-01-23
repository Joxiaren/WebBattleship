export default class DOMManager{
    static DOMM = undefined;
    DOMList = {};
    DOMCount = 0;

    static createManager(){
        DOMManager.DOMM = new DOMManager();
    }
    static getManager(){
        if(DOMManager.DOMM === undefined){
            this.createManager();
        }
        return DOMManager.DOMM;
    }

    createDOM(tag, className, id){
        const newDom = document.createElement(`${tag}`);
        if(className){
            className = className.split(' ');
            className.forEach(classN => {
                newDom.classList.add(classN);
            });
        } 
        newDom.id = (id === undefined ? `id${this.DOMCount}` : id); //

        this.DOMList[newDom.id] = newDom;
        this.DOMCount += 1;
        
        return newDom.id;
    }
    removeDOM(id){
        this.DOMList[id].remove();
        delete this.DOMList[id];
    }
    setAttribute(id, attribute, value){
        this.DOMList[id].setAttribute(attribute, value);
    }
    setStyle(id, styleAttribute, styleValue){
        this.DOMList[id].style[styleAttribute] = styleValue;
    }
    readAttribute(id , attribute){
        return this.DOMList[id].getAttribute(attribute);
    }
    setTextContent(id, content){
        this.DOMList[id].textContent = content;
    }
    setInnerHtml(id, htmlCode){
        this.DOMList[id].innerHTML = htmlCode;
    }
    addToBody(id){
        document.body.append(this.DOMList[id]);
    }
    addChild(idParent, idChild){
        this.DOMList[idParent].appendChild(this.DOMList[idChild]);
    }
    addClass(id, className){
        this.DOMList[id].classList.add(className);
    }
    addEvent(id, event, f, capture=true){
        this.DOMList[id].addEventListener(`${event}`, f, capture);
    }
    removeChild(idParent, idChild, del=true){
        this.DOMList[idParent].removeChild(this.DOMList[idChild]);
        if(del) this.removeDOM(idChild);
    }
    removeAllChildren(idParent){
        const DOM = this.DOMList[idParent];
        if(!DOM) return;
        while(DOM.firstChild){
            DOM.removeChild(DOM.firstChild);
        }
    }
    removeClass(id, className){
        this.DOMList[id].classList.remove(className);
    }
    removeEvent(id, event, f, capture=true){
        this.DOMList[id].removeEventListener(`${event}`, f, capture);
    }
    query(id, q){
        return this.DOMList[id].querySelector(q);
    }
    queryAll(id, q){
        return this.DOMList[id].querySelectorAll(q);
    }
    findDOM(className){
        let ret;
    }
    findAllDOM(className){
        let ret = [];
    }
}

