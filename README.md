# arrow-key-nav
Navigate between elements using arrow keys.

## Arrow Key Navigation

This tool enables navigation using keyboard arrow keys between a HTML document's elements. It supports automatic detection of the
most sensible element to jump to when hitting arrow keys. It doesn't impose a rule on the type of the element it can work with.

## Installation

```
npm i arrow-key-nav
```


## API

add the class ``"arrow-navigable"`` to each element you want to enable keyboard navigation for. 
e.g. ```<div className="arrow-navigable"></div> ```

### setNavigableClassName(className) 
change the default "arrow-navigable" to a class name of your choosing. 

```
import {setNavigableClassName} from "arrow-key-nav" 
setNavigableClassName("my-navigable-element");
```
