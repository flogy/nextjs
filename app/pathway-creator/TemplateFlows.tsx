export const overviewNodes = [
  {
    "id": "primary_start_3thcxiDWBYRRHCoNZsmxCt",
    "type": "start",
    "data": {
        "label": "Start",
        "width": 8,
        "selected": false,
        "disabled": false
    },
    "position": {
        "x": 102,
        "y": 119
    }
  },
  {
    "id": "primary_routine_pjcjtuA7RFZpE5YBwdzTFr",
    "type": "routine",
    "data": {
        "label": "Vorbereitung",
        "width": 12,
        "selected": false,
        "disabled": false
    },
    "position": {
        "x": 233,
        "y": 119
    }
  },
  {
    "id": "primary_routine_5ruF5xZXCJqyuLpwJCkije",
    "type": "routine",
    "data": {
        "label": "Eintritt",
        "width": 8,
        "selected": false,
        "disabled": false
    },
    "position": {
        "x": 567,
        "y": 119
    }
  },
  {
    "id": "primary_routine_4YJu45EAnLbTXgAzoRRsz3",
    "type": "routine",
    "data": {
        "label": "Therapiebeginn",
        "width": 14,
        "selected": false,
        "disabled": false
    },
    "position": {
        "x": 734,
        "y": 119
    }
  },
  {
    "id": "primary_routine_shegJkUcHzUN8LFMMK5Re1",
    "type": "routine",
    "data": {
        "label": "Therapie & Nachsorge",
        "width": 20,
        "selected": false,
        "disabled": false
    },
    "position": {
        "x": 1065,
        "y": 119
    }
  },
  {
    "id": "primary_routine_dGq2eWiq4fmdpJERwATJjf",
    "type": "routine",
    "data": {
        "label": "Austritt",
        "width": 8,
        "selected": false,
        "disabled": false
    },
    "position": {
        "x": 1401,
        "y": 119
    }
  },
  {
    "id": "primary_end_q4oKw6P8u3R6amULrtokHW",
    "type": "end",
    "data": {
        "label": "End",
        "width": 8,
        "selected": false,
        "disabled": false
    },
    "position": {
        "x": 1569,
        "y": 119
    }
  }
]


export const overviewEdges = [
  {
      "source": "primary_start_3thcxiDWBYRRHCoNZsmxCt",
      "sourceHandle": "out1",
      "target": "primary_routine_pjcjtuA7RFZpE5YBwdzTFr",
      "targetHandle": "in1",
      "id": "reactflow__edge-primary_start_3thcxiDWBYRRHCoNZsmxCtout1-primary_routine_pjcjtuA7RFZpE5YBwdzTFrin1",
      "type": "smoothstep"
  },
  {
      "source": "primary_routine_pjcjtuA7RFZpE5YBwdzTFr",
      "sourceHandle": "out2",
      "target": "primary_routine_5ruF5xZXCJqyuLpwJCkije",
      "targetHandle": "in1",
      "id": "reactflow__edge-primary_routine_pjcjtuA7RFZpE5YBwdzTFrout2-primary_routine_5ruF5xZXCJqyuLpwJCkijein1",
      "type": "smoothstep"
  },
  {
      "source": "primary_routine_5ruF5xZXCJqyuLpwJCkije",
      "sourceHandle": "out2",
      "target": "primary_routine_4YJu45EAnLbTXgAzoRRsz3",
      "targetHandle": "in1",
      "id": "reactflow__edge-primary_routine_5ruF5xZXCJqyuLpwJCkijeout2-primary_routine_4YJu45EAnLbTXgAzoRRsz3in1",
      "type": "smoothstep"
  },
  {
      "source": "primary_routine_4YJu45EAnLbTXgAzoRRsz3",
      "sourceHandle": "out2",
      "target": "primary_routine_shegJkUcHzUN8LFMMK5Re1",
      "targetHandle": "in1",
      "id": "reactflow__edge-primary_routine_4YJu45EAnLbTXgAzoRRsz3out2-primary_routine_shegJkUcHzUN8LFMMK5Re1in1",
      "type": "smoothstep"
  },
  {
      "source": "primary_routine_shegJkUcHzUN8LFMMK5Re1",
      "sourceHandle": "out2",
      "target": "primary_routine_dGq2eWiq4fmdpJERwATJjf",
      "targetHandle": "in1",
      "id": "reactflow__edge-primary_routine_shegJkUcHzUN8LFMMK5Re1out2-primary_routine_dGq2eWiq4fmdpJERwATJjfin1",
      "type": "smoothstep"
  },
  {
      "source": "primary_routine_dGq2eWiq4fmdpJERwATJjf",
      "sourceHandle": "out2",
      "target": "primary_end_q4oKw6P8u3R6amULrtokHW",
      "targetHandle": "in1",
      "id": "reactflow__edge-primary_routine_dGq2eWiq4fmdpJERwATJjfout2-primary_end_q4oKw6P8u3R6amULrtokHWin1",
      "type": "smoothstep"
  }
  ]