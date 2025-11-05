// document.getElementById('test-button').addEventListener('click', function (){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
// })
'use strict';
{

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log('clickedElement: ', clickedElement);
    console.log('clickedElement (with plus): ' + clickedElement);
    
    /*[DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    /*[DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    
    /*[DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    
    /*[DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);
    
    /*[DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);
    
    /*[DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };



  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optAuthorSelector = '.post-author',
    optTagListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-' ;

  const generateTitleLinks = function(customSelector = '') {

    /*Remove contents of titleList*/
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /*for each article*/
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';
    
    for(let article of articles){
      /*get article id*/
      const articleId = article.getAttribute('id');
      console.log(articleId);
      /*get the title from the title element*/
      const articleTitle = article.querySelector(optTitleSelector).innerHTML; //!!
      console.log(articleTitle);
      /*create html of the link*/
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);
      /*insert link into titlelist*/
      html = html + linkHTML;
    }  
    titleList.innerHTML = html;
    console.log(html);

    const links = document.querySelectorAll('.titles a');
    console.log(links);
  
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  function calculateTagsParams(tags){
    let params = {
      max: 0,
      min: 99999
    };

    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');
      if(tags[tag] > params.max){
        params.max = tags[tag];
      }
      if(tags[tag] < params.min){
        params.min = tags[tag];
      }
    }

    return params;
  }


  function calculateTagClass(count, params){
    const normalizedCount = count - params.min;

    const normalizedMax = params.max - params.min;

    const percentage = normalizedCount / normalizedMax;

    const classNumber = Math.floor(percentage * (optCloudClassCount -1) + 1);

    return optCloudClassPrefix + classNumber
  }

  const generateTags = function(){
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

  /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for(let article of articles){
      /* find tags wrapper */
      const tagList = article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        /* add generated code to html variable */
        html = html + linkHTML;
        console.log(html);
        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        }else {
          allTags[tag]++;
        }
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagList.innerHTML = html;
      /* END LOOP: for every article: */
    }
      /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagListSelector);
    /* [NEW] create variable for all links HTML code */
    const tagParams = calculateTagsParams(allTags);
    console.log('tagsParams: ', tagParams);
    let allTagsHTML = ''
    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      console.log(allTagsHTML);
      const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagParams) + '">' + tag  + '</a></li>';
      console.log(tagLinkHTML);
      allTagsHTML += tagLinkHTML;

      /* [NEW] END LOOP: for each tag in allTags: */
    }
    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  }


  generateTags();
  
  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('.active');
    /* START LOOP: for each active tag link */
    for(let activeTag of activeTags){
      /* remove class active */
      activeTag.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const equalTags = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for(let tag of equalTags){
      /* add class active */
      tag.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }
  
  function addClickListenersToTags(){
    /* find all links to tags */
    const links = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
    for(let link of links){
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }
  }
  
  addClickListenersToTags();
  
  //Autorzy:
  function generateAuthors(){
    const articles = document.querySelectorAll(optArticleSelector);

    for(let article of articles){
      const authors = article.querySelector(optAuthorSelector);
      console.log(authors);
      let html = '';
      const authorNameRaw = article.getAttribute('data-author');
      const authorName = authorNameRaw.replace('-',' ')
      console.log(authorName);

      const linkHTML = 'by <a href="#author-' + authorNameRaw + '">' + authorName + '</a>'
      html += linkHTML;
      authors.innerHTML = html;
      console.log(authors.innerHTML);

    }

  }

  generateAuthors();


  function authorClickHandler(event){
    event.preventDefault()
    const clickedElement = this;

    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-','');
    const activeAuthors = document.querySelectorAll('.active');

    for(let activeAuthor of activeAuthors){
      activeAuthor.classList.remove('active');
    }

    const equalAuthors = document.querySelectorAll('a[href="'+ href +'"]');

    for(let equalAuthor of equalAuthors){
      equalAuthor.classList.add('active');
    }

    generateTitleLinks('[data-author="' + author + '"]');

  }

  function addClickListenerToAuthors(){
    const links = document.querySelectorAll('.post-author a');
    for(let link of links){
      link.addEventListener('click', authorClickHandler);
    }
  }

  addClickListenerToAuthors();

};

