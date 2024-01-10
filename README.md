# Whiteboards.io schema

This is the place where the data format, used internally to represent items on a board
for [Whiteboards.io](https://whiteboards.io/) app, is documented. A JSON file created according to the schema presented
here can be used as an input file to "restore" operation on [Whiteboards.io](https://whiteboards.io/) and turned into a
fully functional board.

You can use that to create your board programmatically or convert other boards into a board
on [Whiteboards.io](https://whiteboards.io/).

## Current implementation status

- This is "in progress", so it doesn't document all the possible types of the cards and properties of them yet
- It's also not meant to document like **all** the possible properties of the cards. Eventually maybe it will, but let's suppose
we add card of type X to the schema - there's will be a chance that it will not document all it's properties but surely 
enough to let you create a card of that type.

That being said, in this schema we try to aim for at least the minimal subset required for every object type, to make it
usable on a [Whiteboards.io](https://whiteboards.io/) board.

## Usage

First, clone the repository, do `npm i`.

In `src/schema` directory you can find Typescript files used to generate the schema along with `schema.json` - the
schema itself.

If you want the schema to be displayed to you in a more readable way, run `npm run display-schema` in the main directory
and then navigate to `http://localhost:3000` (3000 is rather commonly used port, so if you want it to run on another one
just do `PORT=xxxx npm run display-schema`). It has some caveats, e.g. it currently does not fully understand `Record`
types, so we will also cover everything here.

## How to create Whiteboards.io cards

The process of creating Whiteboards.io cards (or migrating some other board into Whiteboards.io format - it's the same)
means that you want to generate a Whiteboards.io board in JSON format, according to the schema, and then go to Whiteboards,
create a new board and use "restore" option from "Boards settings" menu, uploading the generated JSON. So let's look at
the examples of how to do that.

According to the schema of `Board` type, the JSON you want to generate has the following structure:

```json
{
  "cards": {
    "_index": {},
    "_items": {}
  },
  "lines": {
    "_index": {},
    "_items": {}
  },
  "blobs": {}
}
```

Let's assume we have a non-whiteboards.io board which conforms some made up schema, and we will try to convert it to Whiteboards.io.

### Cards
Sample "non-whiteboards.io" board:

```json
[
  {
    "id": 111,
    "type": "sticky",
    "contents": "<span>Card text</span>",
    "position": {
      "x": 100,
      "y": 200
    },
    "dimensions": {
      "width": 400,
      "height": 200
    },
    "card_styles": {
      "backgroundColor": "#ccc",
      "textAlign": "left"
    }
  },
  {
    "id": 567,
    "type": "sticky",
    "contents": "Foo",
    "position": {
      "x": -10,
      "y": -50
    },
    "dimensions": {
      "width": 150,
      "height": 300
    }
  }
]
```
After conversion to Whiteboards.io schema:
```json
{
  "cards": {
    "_index": {
      "111": true,
      "567": true
    },
    "_items": {
      "111": {
        "id": "111",
        "text": "Card text",
        "x": 100,
        "y": 200,
        "width": 400,
        "height": 200,
        "color": "#ccc"
      },
      "567": {
        "id": "567",
        "text": "Foo",
        "x": -10,
        "y": -50,
        "width": 150,
        "height": 300
      }
    }
  },
  "lines": {
    "_index": {},
    "_items": {}
  },
  "blobs": {}
}
```

### Lines
#### Connecting two items
Sample "non-whiteboards.io" board:

```json
[
  {
    "id": 111,
    "type": "sticky",
    "otherProps": "omitted for readability"
  },
  {
    "id": 567,
    "type": "sticky",
    "otherProps": "omitted for readability"
  },
  {
    "id": 222,
    "type": "line",
    "connects": {
      "start": 567,
      "end": 111
    },
    "arrow": {
      "leftArrow": "visible",
      "rightArrow": "none"
    },
    "strokeStyle": {
      "width": 2,
      "color": "#333",
      "lineStyle": "dash"
    }
  }
]
```
After conversion to Whiteboards.io schema:

```json
{
  "cards": {
    "_index": {
      "111": true,
      "567": true
    },
    "_items": {
      "111": {
        "id": "111",
        "text": "Card text",
        "x": 100,
        "y": 200,
        "width": 400,
        "height": 200,
        "color": "#ccc"
      },
      "567": {
        "id": "567",
        "text": "Foo",
        "x": -10,
        "y": -50,
        "width": 150,
        "height": 300
      }
    }
  },
  "lines": {
    "_index": {
      "222": true
    },
    "_items": {
      "222": {
        "id": "222",
        "arrowLeft": true,
        "arrowRight": false,
        "color": "#333",
        "thickness": 2,
        "style": "dashed",
        "startCardId": "567",
        "endCardId": "111"
      }
    }
  },
  "blobs": {}
}
```

#### Floating lines (not connected to anything)
Sample "non-whiteboards.io" board:

```json
[
  {
    "id": 123,
    "type": "line",
    "startX": 130,
    "startY": 17,
    "endX": -10,
    "endY": -1.5
  }
]
```
After conversion to Whiteboards.io schema:

```json
{
  "cards": {
    "_index": {},
    "_items": {}
  },
  "lines": {
    "_index": {
      "123": true
    },
    "_items": {
      "123": {
        "id": "123",
        "start": {
          "x": 130,
          "y": 17
        },
        "end": {
          "x": -10,
          "y": -1.5
        }
      }
    }
  },
  "blobs": {}
}
```

### Blobs (e.g. image card)
Sample "non-whiteboards.io" board:

```json
[
  {
    "id": 777,
    "type": "image",
    "imageURL": "hxxp://example.com/image.png",
    "position": {
      "x": 100,
      "y": 200
    },
    "dimensions": {
      "width": 400,
      "height": 200
    }
  }
]
```
After conversion to Whiteboards.io schema:

```json
{
  "cards": {
    "_index": {
      "777": true
    },
    "_items": {
      "777": {
        "id": "777",
        "x": 100,
        "y": 200,
        "width": 400,
        "height": 200,
        "dataBlob": "someUniqueBlobId-777"
      }
    }
  },
  "lines": {
    "_index": {},
    "_items": {}
  },
  "blobs": {
    "someUniqueBlobId-777": "https://picsum.photos/400/200#image/jpg"
  }
}
```

### Text
Sample "non-whiteboards.io" board:

```json
[
  {
    "id": 789,
    "type": "text",
    "contents": "<p>Card text</p>",
    "position": {
      "x": 100,
      "y": 200
    },
    "dimensions": {
      "width": 400,
      "height": 200
    },
    "bold": true,
    "underline": true
  }
]
```
After conversion to Whiteboards.io schema:

```json
{
  "cards": {
    "_index": {
      "789": true
    },
    "_items": {
      "789": {
        "id": "789",
        "text": "Card text",
        "x": 100,
        "y": 200,
        "width": 400,
        "height": 200,
        "textOnly": true,
        "textStyle": {
          "bold": true,
          "underline": true
        }
      }
    }
  },
  "lines": {
    "_index": {},
    "_items": {}
  },
  "blobs": {}
}
```

### Shapes / Flowchart
Sample "non-whiteboards.io" board:

```json
[
  {
    "id": "card1_id",
    "type": "shape",
    "shapeType": "heart",
    "contents": "<p>Card text</p>",
    "position": {
      "x": 100,
      "y": 200
    },
    "dimensions": {
      "width": 400,
      "height": 200
    },
    "card_styles": {
      "backgroundColor": "#FDD0EC",
      "borderColor": "#E774BB"
    }
  },
  {
    "id": "card2_id",
    "type": "shape",
    "shapeType": "database",
    "contents": "<p>Database</p>",
    "position": {
      "x": 320,
      "y": 150
    },
    "dimensions": {
      "width": 400,
      "height": 200
    }
  }
]
```
After conversion to Whiteboards.io schema:

```json
{
  "cards": {
    "_index": {
      "card1_id": true,
      "card2_id": true
    },
    "_items": {
      "card1_id": {
        "id": "card1_id",
        "borderColor": "#E774BB",
        "color": "#FDD0EC",
        "shape": true,
        "shapeType": "heart",
        "text": "Card text",
        "shadowDisabled": true,
        "x": 100,
        "y": 200,
        "width": 150,
        "height": 150
      },
      "card2_id": {
        "id": "card2_id",
        "borderColor": "#000",
        "shape": true,
        "shapeType": "database",
        "text": "Database",
        "shadowDisabled": true,
        "x": 320,
        "y": 150,
        "width": 150,
        "height": 150
      }
    }
  },
  "lines": {},
  "blobs": {}
}
```

### Free draw (path card)
Sample "non-whiteboards.io" board:

```json
[
  {
    "id": "card1_id",
    "type": "path",
    "path": [
      { "x": 70, "y": 110},
      { "x": 80, "y": 147},
      { "x": 18, "y": 177},
      { "x": 49, "y": 208},
      { "x": 85, "y": 238},
      { "x": 122, "y":  275},
      { "x": 147, "y":  300},
      { "x": 159, "y":  324},
      { "x": 165, "y":  349},
      { "x": 165, "y":  379},
      { "x": 147, "y":  404}
    ],
    "position": {
      "x": 100,
      "y": 200
    },
    "dimensions": {
      "width": 150,
      "height": 150
    },
    "card_styles": {
      "color": "#E774BB",
      "thickness": 2
    }
  }
]
```
After conversion to Whiteboards.io schema:

```json
{
  "cards": {
    "_index": {
      "card1_id": true
    },
    "_items": {
      "card1_id": {
        "id": "card1_id",
        "color": "#E774BB",
        "path": [
          [70, 110],
          [80, 147],
          [18, 177],
          [49, 208],
          [85, 238],
          [122, 275],
          [147, 300],
          [159, 324],
          [165, 349],
          [165, 379],
          [147, 404]
        ],
        "thickness": 2,
        "x": 100,
        "y": 200,
        "width": 150,
        "height": 150
      }
    }
  },
  "lines": {},
  "blobs": {}
}
```

### Github Issues
Sample "non-whiteboards.io" board:

```json
[
  {
    "id": 111,
    "type": "github_issue",
    "issue_id": 32,
    "title": "Github issue",
    "author": "user_name",
    "repository": "repository_name",
    "position": {
      "x": 100,
      "y": 200
    },
    "dimensions": {
      "width": 400,
      "height": 200
    }
  }
]
```
After conversion to Whiteboards.io schema:
```json
{
  "cards": {
    "_index": {
      "111": true
    },
    "_items": {
      "111": {
        "id": "111",
        "githubIssueKey": {
          "issue_number": 32,
          "owner": "user_name",
          "repo": "repository_name",
          "title": "Github issue"
        },
        "x": 100,
        "y": 200,
        "width": 400,
        "height": 200
      }
    }
  },
  "lines": {
    "_index": {},
    "_items": {}
  },
  "blobs": {}
}
```

### Jira Issues
Sample "non-whiteboards.io" board:

```json
[
  {
    "id": 111,
    "type": "jira_issue",
    "issue_id": 10305,
    "site_id": "xxxxxxxx-dfd6-lk7e-978c-d0ddf5s4eb35",
    "position": {
      "x": 100,
      "y": 200
    },
    "dimensions": {
      "width": 400,
      "height": 200
    }
  }
]
```
After conversion to Whiteboards.io schema:
```json
{
  "cards": {
    "_index": {
      "111": true
    },
    "_items": {
      "111": {
        "id": "111",
        "issueId": "10305",
        "siteId": "xxxxxxxx-dfd6-lk7e-978c-d0ddf5s4eb35",
        "x": 100,
        "y": 200,
        "width": 400,
        "height": 200
      }
    }
  },
  "lines": {
    "_index": {},
    "_items": {}
  },
  "blobs": {}
}
```

### Jira Issue Links
Sample "non-whiteboards.io" board:

```json
[
  {
    "id": "card1_id",
    "type": "jira_issue",
    "issueId": "10301",
    "siteId": "xxxxxxxx-dfd6-lk7e-978c-d0ddf5s4eb35",
    "otherProps": "omitted for readability"
  },
  {
    "id": "card2_id",
    "type": "jira_issue",
    "issueId": "10305",
    "siteId": "xxxxxxxx-dfd6-lk7e-978c-d0ddf5s4eb35",
    "otherProps": "omitted for readability"
  },
  {
    "id": "line_id",
    "type": "issue_link",
    "link_id": "10047",
    "site_id": "xxxxxxxx-dfd6-lk7e-978c-d0ddf5s4eb35",
    "connects": {
      "start": "card1_id",
      "end": "card2_id"
    },
    "arrow": {
      "rightArrow": "visible",
      "leftArrow": "none"
    },
    "strokeStyle": {
      "width": 2,
      "color": "#F61969",
      "lineStyle": "solid"
    }
  }
]
```
After conversion to Whiteboards.io schema:
```json
{
  "cards": {
    "_index": {
      "card1_id": true,
      "card2_id": true
    },
    "_items": {
      "card1_id": {
        "id": "card1_id",
        "issueId": "10301",
        "siteId": "xxxxxxxx-dfd6-lk7e-978c-d0ddf5s4eb35",
        "x": 100,
        "y": 200,
        "width": 450,
        "height": 150
      },
      "card2_id": {
        "id": "card2_id",
        "issueId": "10305",
        "siteId": "xxxxxxxx-dfd6-lk7e-978c-d0ddf5s4eb35",
        "x": 800,
        "y": 100,
        "width": 450,
        "height": 150
      }
    }
  },
  "lines": {
    "_index": {
      "line_id": true
    },
    "_items": {
      "line_id": {
        "id": "line_id",
        "issueLinkId": "10047",
        "siteId": "xxxxxxxx-dfd6-lk7e-978c-d0ddf5s4eb35",
        "startCardId": "card1_id",
        "endCardId": "card2_id",
        "arrowRight": true,
        "color": "#F61969",
        "style": "solid",
        "curveType": "curve-catmull-rom",
        "type": "curve"
      }
    }
  },
  "blobs": {}
}
```

## Summary

We hope that using those simple examples (and the schema for the things that haven't been referenced there) you will be
able to create Whiteboards.io boards or convert existing non-Whiteboards.io boards into Whiteboards.io boards. In case
of any questions do not hesitate to contact us at [support@whiteboards.team](mailto:support@whiteboards.team).

Kind reminder that this is WIP, so expect more definitions to come in the future.