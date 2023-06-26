 
import G6 from '@antv/g6-3.5';

export function renderMap(data,graph){
  // console.log('data',data,graph)

  const collapseIcon = (x, y, r) => {
    return [
      ['M', x - r, y],
      ['a', r, r, 0, 1, 0, r * 2, 0],
      ['a', r, r, 0, 1, 0, -r * 2, 0],
      ['M', x - r + 4, y],
      ['L', x - r + 2 * r - 4, y],
    ];
  };
  const expandIcon = (x, y, r) => {
    return [
      ['M', x - r, y],
      ['a', r, r, 0, 1, 0, r * 2, 0],
      ['a', r, r, 0, 1, 0, -r * 2, 0],
      ['M', x - r + 4, y],
      ['L', x - r + 2 * r - 4, y],
      ['M', x - r + r, y - r + 4],
      ['L', x, y + r - 4],
    ];
  };

  G6.registerCombo('cRect', {
    drawShape: function drawShape(cfg, group) {
      const self = this;
      // Get the padding from the configuration
      cfg.padding = cfg.padding || [50, 20, 20, 20];
      // Get the shape's style, where the style.width and style.height correspond to the width and height in the figure of Illustration of Built-in Rect Combo
      const style = self.getShapeStyle(cfg);
      // Add a rect shape as the keyShape which is the same as the extended rect Combo
      const rect = group.addShape('rect', {
        attrs: {
          ...style,
          x: -style.width / 2 - (cfg.padding[3] - cfg.padding[1]) / 2,
          y: -style.height / 2 - (cfg.padding[0] - cfg.padding[2]) / 2,
          width: style.width,
          height: style.height
        },
        draggable: true,
        name: 'combo-keyShape'
      });
      // Add the circle on the right
      group.addShape('marker', {
        attrs: {
          ...style,
          fill: '#fff',
          opacity: 1,
          // cfg.style.width and cfg.style.heigth correspond to the innerWidth and innerHeight in the figure of Illustration of Built-in Rect Combo
          x: cfg.style.width / 2 + cfg.padding[1],
          y: (cfg.padding[2] - cfg.padding[0]) / 2,
          r: 10,
          symbol: collapseIcon
        },
        draggable: true,
        name: 'combo-marker-shape'
      });
      return rect;
    },
    // Define the updating logic of the right circle
    afterUpdate: function afterUpdate(cfg, combo) {
      console.log(cfg.collapsed, combo)
      const group = combo.get('group');
      // Find the circle shape in the graphics group of the Combo by name
      const marker = group.find(ele => ele.get('name') === 'combo-marker-shape');
      // Update the position of the right circle
      marker.attr({
        // cfg.style.width and cfg.style.heigth correspond to the innerWidth and innerHeight in the figure of Illustration of Built-in Rect Combo
        x: cfg.style.width / 2 + cfg.padding[1],
        y: (cfg.padding[2] - cfg.padding[0]) / 2,
        // The property 'collapsed' in the combo data represents the collapsing state of the Combo
        // Update the symbol according to 'collapsed'
        symbol: cfg.collapsed ? expandIcon : collapseIcon
      });
    }
  }, 'rect');

  G6.registerEdge(
    'line-arrow', 
    {
      getPath(points) {
        const startPoint = points[0];
        const endPoint = points[1];
        return [
          ['M', startPoint.x, startPoint.y],
          ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y],
          ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y],
          ['L', endPoint.x, endPoint.y],
        ];
      },
      getShapeStyle(cfg) {
        const startPoint = cfg.startPoint;
        const endPoint = cfg.endPoint;
        const controlPoints = this.getControlPoints(cfg);
        let points = [startPoint]; // the start point
        // the control points
        if (controlPoints) {
          points = points.concat(controlPoints);
        }
        // the end point
        points.push(endPoint);
        const path = this.getPath(points);
        const style = Object.assign(
          {},
          G6.Global.defaultEdge.style,
          {
            stroke: '#BBB',
            lineWidth: 1,
            path,
          },
          cfg.style,
        );
        return style;
      },
    },
    'line',
  );

  // const width = document.getElementById('container').scrollWidth;
  // const height = (document.getElementById('container').scrollHeight || 500) - 20;
  
  graph.current.data(data);
  graph.current.render();

  // collapse/expand when click the marker
  graph.current.on('combo:click', e => {
    if (e.target.get('name') === 'combo-marker-shape') {
      // graph.current.collapseExpandCombo(e.item.getModel().id);
      graph.current.collapseExpandCombo(e.item);
      if (graph.current.get('layout')) graph.current.layout();
      else graph.current.refreshPositions();
    }
  });

  graph.current.on('combo:dragend', e => {
    graph.current.getCombos().forEach(combo => {
      graph.current.setItemState(combo, 'dragenter', false);
    })
  });
  graph.current.on('node:dragend', e => {
    graph.current.getCombos().forEach(combo => {
      graph.current.setItemState(combo, 'dragenter', false);
    })
  });

  graph.current.on('combo:dragenter', e => {
    graph.current.setItemState(e.item, 'dragenter', true);
  });
  graph.current.on('combo:dragleave', e => {
    graph.current.setItemState(e.item, 'dragenter', false);
  });
}