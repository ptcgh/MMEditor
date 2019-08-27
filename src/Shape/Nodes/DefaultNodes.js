export default {
	linkPoints: [{ x: 0.5, y: 0 }, { x: 0.5, y: 1 }],
	render: (data, snapPaper) => {
		const node = snapPaper.rect(0, 0, 100, 40);
		const text = snapPaper.text(20, 25, data.name);
		node.attr({
			fill: "#fff",
			stroke: "#000",
			rx: 5,
			ry: 5
		});
		return snapPaper.group(node, text);
	},
	renderLinkPoint: (node, linkPoint, circle) => {
		circle = circle || node.paper.circle(0, 0, 5, 5);
		const box = node.shape.getBBox();
		const x = linkPoint.x * box.w + parseInt(node.data.x, 10);
		const y = linkPoint.y * box.h + parseInt(node.data.y, 10);
		circle.attr({
			cx: x,
			cy: y,
			fill: "#fff",
			display: "none",
			stroke: "#08c",
			class: "mm-link-points"
		});
		circle.data = linkPoint;
		circle.data.box = box;
		circle.data.type = "input";
		circle.x = x;
		circle.y = y;
		circle.local = {
			x: linkPoint.x * box.w,
			y: linkPoint.y * box.h
		};
		return circle;
	},

	updateLinkPoint: (node, linkPoint) => {
		const { local } = linkPoint;
		const x = local.x + node.data.x;
		const y = local.y + node.data.y;
		linkPoint.attr({
			cx: x,
			cy: y
		});
		linkPoint.x = x;
		linkPoint.y = y;
	}
};