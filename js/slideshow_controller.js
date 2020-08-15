class SlideShowController extends Stimulus.Controller {

  static targets = ["number", "tags"] 

  numberOfSlides() {
    this.tags.innerHTML = ""
    var data

    var ourRequest = new XMLHttpRequest()
    ourRequest.open('GET', 'https://shubham1010.github.io/jsonfiles/ex01.json')

    ourRequest.onload = ()=> {
      data = JSON.parse(ourRequest.responseText)

      var id;
      var name;
      var image;


      for(var i=0; i<data.length; i++) {
        name = data[i].name
        image = data[i].imgurl
        this.tags.innerHTML += `<div class="hide" id=${i+1}> <h2>${name}</h2><a target="_blank" href=${image}>  <img src=${image} /></a></div>`
      }
   
      // handling limit for slideshow panel
      if (Number(this.number) <=0 || Number(this.number)>12) { 
        alert("Please enter number between 0 and 13")
        return
      }

      // activating entered number of slides
      for (var i=0; i<Number(this.number); i++) {
        this.tags.childNodes[i].classList.add("slide")
        this.tags.childNodes[i].classList.remove("hide")
      }

      this.slideshow()

    }
    ourRequest.send()    
 }

  stop() {
    // stop the slideshow 
    location.reload()
  }

  slideshow() {
    
    // hide the beginning child 
    this.tags.childNodes[0].classList.add("hide")
    this.tags.childNodes[0].classList.remove("slide")

    var temp = this.tags.childNodes[0]
    
    // remove the beginning child
    this.tags.removeChild(this.tags.childNodes[0])

    // append it to the last
    this.tags.appendChild(temp)

    // display the i'th child
    this.tags.childNodes[this.number-1].classList.add("slide")
    this.tags.childNodes[this.number-1].classList.remove("hide")

    // calling the slideshow function with delay of 2seconds
    setTimeout( ()=>{ this.slideshow() }, 2000)


  }

  // getting the tags elements
  get tags() {
    return this.tagsTarget
  }

  // getting the entered number
  get number() {
    return this.numberTarget.value
  }

}

const application = Stimulus.Application.start()
application.register("slideshow", SlideShowController)
