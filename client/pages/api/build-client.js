import axios from "axios";
import Runtime from "../infra/runtime/Runtime";

export default ({ req }) => {
  if (Runtime.isRunningInServer()) {
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    return axios.create({
      baseURL: "/",
    });
  }
};
