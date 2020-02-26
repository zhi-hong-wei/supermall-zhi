import axios from 'axios'

export function request(config) {

    //创建axios实例
    const instance=axios.create({
      baseURL:'http://106.54.54.237:8000/api/hy',
      timeout:5000
    })

  //请求拦截
  instance.interceptors.request.use(config=>{
   /* console.log(config);*/
    //每次发送网络请求都需要在界面中显示一个请求图标
    //某些网络请求（比如登录token）需要携带一些特殊信息
    return config
  },err=>{
    /*console.log(err);*/
  })

  //失败拦截
  instance.interceptors.response.use(res=>{
    /*console.log(res);*/
    return res.data
  },err=>{
   /* console.log(err);*/
  })

    //发送真正的网络请求
    return instance(config)
  }



