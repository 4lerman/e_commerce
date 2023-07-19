const cors = {
	exposedHeader: "*",
	origin: "http://localhost:5000",
	method: "GET, PUT, POST, DELETE",
	credentials: true,
};

export default { cors };
