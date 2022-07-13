### Properties
```
{
  "properties": {
    "study_id": /* Required String */,
    "study_name": /* Required String */,
    "instructions": /* Required String */,
    "banner_url": /* Required String */,
    "support_email": /* Required String */,
    "support_url": /* Required String */,
    "ethics": /* Required String */,
    "pls":/* Required String */,
    "empty_msg": /* Required String */,
    "post_url": /* Required String */,
    "conditions": /* Required Array */,
    "cache": /* Required Boolean */
  },
  ...

```


### Modules
```
  ...
  "modules": [
    {
      "type":/* Required String */,
      "name":/* Required String */,
      "submit_txt":/* Required String */,
      "condition":/* Required String */,
      "alerts": {
        "title": /* Required String */,
        "message": /* Required String */,
        "start_offset": /* Required Integer */,
        "duration": /* Required Integer */,
        "times": /* Required Array */,
        "random": /* Required Boolean */,
        random_interval": /* Required Integer */,
        "sticky": /* Required boolean */,
        "sticky_label": /* Required String */,
        "timeout": /* Required Boolean */,
        "timeout_after": /* Required Integer */
      },
      "graph": {
        "display": /* Required Boolean */,
        "variable": /* Required String */,
        "title": /* Required String */,
        "blurb": /* Required String */,
        "type": /* Required String */,
        "max_points": /* Required Integer */
      },
      "sections":{
        [
          {
            "name": /* Required String */,
            "questions": [
                /* question objects */
            ],
            "shuffle": /* Array */
          }
        ]
      },
      "uuid": /* String */,
      "unlock_after": /* Array */,
      "shuffle": /* Boolean */
    } 
  ]
}

```

### Different Question Objects Json requests

* Instruction
* Text Input
* Date/Time
* Yes/No (boolean)
* Slider
* Multiple Choice
* Media
* Branching

1. Instruction 

```
...
    "questions": [
      {
        "id": /* Required String */,
        "type": /* Required String */,
        "text": /* Required String */,
        "required": /* Required Boolean */  
      }        
    ],
...
```
2. Text Input 

```
...
    "questions": [
      {
        "id": /* Required String */,
        "type": /* Required String */,
        "text": /* Required String */,
        "required": /* Required Boolean */,
        "subtype": /* Required String - Accepted values are ```short```, ```long```, and ```numeric``` */ 
      }         
    ],
...
```

3. Date/Time

```
...
    "questions": [
      {
        "id": /* Required String */,
        "type": /* Required String */,
        "text": /* Required String */,
        "required": /* Required Boolean */,
        "subtype": /* Required String - Accepted values are ```date``` (datepicker only), ```time``` (timepicker only), and ```datetime``` (both) */
      }          
    ],
...
```

4. Yes/No (boolean)

```
...
    "questions": [
      {
        "id": /* Required String */,
        "type": /* Required String */,
        "text": /* Required String */,
        "required": /* Required Boolean */,
        "yes_text": /* Required String */,
        "no_text" : /* Required String */    
      }      
    ],
...
```

5. Slider

```
...
    "questions": [
      {
        "id": /* Required String */,
        "type": /* Required String */,
        "text": /* Required String */,
        "required": /* Required Boolean */,
        "min": /* Required Integer */,
        "max" : /* Required Integer */,
        "hint_left": /* Required String */,
        "hint_right": /* Required String */
      }          
    ],
...
```
6. Multiple Choice

```
...
    "questions": [
      {
        "id": /* Required String */,
        "type": /* Required String */,
        "text": /* Required String */,
        "required": /* Required Boolean */,
        "radio": /* Required Boolean */,
        "modal" : /* Required Boolean */,
        "options": /* Required Array */,
        "shuffle": /* Required Boolean */
      }     
    ],
...
```

7. Media

```
...
    "questions": [
      {
        "id": /* Required String */,
        "type": /* Required String */,
        "text": /* Required String */,
        "required": /* Required Boolean */,
        "subtype": /* Required String - Accepted values are ```video```, ```audio```, and ```image``` */,
        "src" : /* Required String */,
        "thumb": /* Required String */ 
      }         
    ],
...
```

8. Branching

```
...
    "questions": [
      {
        "id": /* Required String */,
        "type": /* Required String */,
        "text": /* Required String */,
        "required": /* Required Boolean */,
        ...
        "hide_id": /* Required String */,
        "hide_value" : /* Required String/Boolean */,
        "hide_if": /* Required Boolean */ 
      }         
    ],
...
```

