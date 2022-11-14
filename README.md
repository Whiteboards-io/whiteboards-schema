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
    "...": "other props omitted for readability"
  },
  {
    "id": 567,
    "type": "sticky",
    "...": "other props omitted for readability"
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
        "...": "other props omitted for readability"
      },
      "567": {
        "id": "567",
        "text": "Foo",
        "...": "other props omitted for readability"
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
        "text": "Card text",
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
    "someUniqueBlobId-777": "hxxp://example.com/image.png#image/png"
  }
}
```

## Summary

We hope that using those simple examples (and the schema for the things that haven't been referenced there) you will be
able to create Whiteboards.io boards or convert existing non-Whiteboards.io boards into Whiteboards.io boards. In case
of any questions do not hesitate to contact us at [support@whiteboards.team](mailto:support@whiteboards.team).

Kind reminder that this is WIP, so expect more definitions to come in the future.