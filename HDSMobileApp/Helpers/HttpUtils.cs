
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.IO;
using System.Net;
using System.ServiceModel.Web;
using System.Text;
using System.Web.Script.Serialization;
/// <summary>
/// Utilities for making web request from PowerScope services to other services/APIs
/// </summary>
/// <since>2015-6-25</since>
namespace HttpUtils
{

    /// <summary>
    /// get/post methods for HttpWebRequest/HttpWebResponse
    /// </summary>
    public class Request
    {
        public static HttpWebResponse get(string url)
        {
            return sendRequestGetResponse(url, "GET", null, -1, null, 0, 0);
        }

        public static HttpWebResponse get(string url, int timeoutMillis)
        {
            return sendRequestGetResponse(url, "GET", null, timeoutMillis, null, 0, 0);
        }

        public static HttpWebResponse get(string url, string contentType, int timeoutMillis)
        {
            return sendRequestGetResponse(url, "GET", contentType, timeoutMillis, null, 0, 0);
        }


        public static HttpWebResponse postJson(string url, int timeoutMillis, byte[] postData)
        {
            return postJson(url, timeoutMillis, postData, 0, postData.Length);
        }


        public static HttpWebResponse postJson(string url, int timeoutMillis, byte[] postData, int off, int len)
        {
            return sendRequestGetResponse(url, "POST", "application/json", timeoutMillis, postData, off, len);
        }


        public static HttpWebResponse sendRequestGetResponse(string url, string method, string contentType, int timeoutMillis, byte[] postData, int off, int len)
        {
            HttpWebRequest webRequest = createAndSendRequest(url, method, contentType, timeoutMillis, postData, off, len);
            HttpWebResponse webResponse = (HttpWebResponse)webRequest.GetResponse();
            return webResponse;
        }


        public static HttpWebRequest createAndSendRequest(string url, string method, string contentType, int timeoutMillis, byte[] postData, int off, int len)
        {
            HttpWebRequest req = (HttpWebRequest)HttpWebRequest.Create(url);
            if (timeoutMillis > -1)
            {
                req.Timeout = timeoutMillis;
            }
            if (method != null)
            {
                req.Method = method;
            }
            if (contentType != null)
            {
                req.ContentType = contentType;
            }
            if (postData != null)
            {
                req.ContentLength = len;
                Stream webStream = req.GetRequestStream();
                webStream.Write(postData, off, len);
                webStream.Close();
            }
            return req;
        }

    }




    /// <summary>
    /// reading HttpWebResponse strings/objects and setting up HttpWebResponse headers
    /// </summary>
    public class Response {
        private static JavaScriptSerializer defaultJsonSerializer = new JavaScriptSerializer();


        public static System.ServiceModel.Channels.Message createJsonCurrentWebResponseNoCache(object data)
        {
            return createJsonWebResponseNoCache(WebOperationContext.Current, data);
        }


        public static System.ServiceModel.Channels.Message createJsonWebResponseNoCache(WebOperationContext context, object data) {
            return createJsonWebResponseNoCache(context, JsonConvert.SerializeObject(data));
        }

        public static System.ServiceModel.Channels.Message createJsonWebResponseNoCache(WebOperationContext context, string json)
        {
            setupWebResponseNoCache(context);
            return createJsonWebResponse(context, json);
        }


        public static void setupCurrentWebResponseNoCache()
        {
            setupWebResponseNoCache(WebOperationContext.Current);
        }


        public static void setupWebResponseNoCache(WebOperationContext context)
        {
            context.OutgoingResponse.Headers.Add("Expires", "-1");
            context.OutgoingResponse.Headers.Add("Cache-Control", "no-cache, no-store");

        }

        public static System.ServiceModel.Channels.Message createJsonCurrentWebResponse(object data)
        {
            var json = JsonConvert.SerializeObject(data);
            return createJsonWebResponse(WebOperationContext.Current, json);
        }


        public static System.ServiceModel.Channels.Message createJsonWebResponse(WebOperationContext context, string json)
        {
            return context.CreateTextResponse(json, "application/json; charset=utf-8");
        }


        public static JObject readStreamJObject(HttpWebResponse webResponse)
        {
            string tmp;
            return readStreamJObject(webResponse, "utf-8", out tmp);
        }


        public static JObject readStreamJObject(HttpWebResponse webResponse, out string streamContents)
        {
            return readStreamJObject(webResponse, "utf-8", out streamContents);
        }


        public static JObject readStreamJObject(HttpWebResponse webResponse, string streamEncoding)
        {
            string tmp;
            return readStreamJObject(webResponse, streamEncoding, out tmp);
        }


        public static JObject readStreamJObject(HttpWebResponse webResponse, string streamEncoding, out string streamContents)
        {
            streamContents = readStreamString(webResponse, streamEncoding);
            JObject response = JObject.Parse(streamContents);
            return response;
        }


        public static string readStreamString(HttpWebResponse webResponse)
        {
            return readStreamString(webResponse, "utf-8");
        }


        public static string readStreamString(HttpWebResponse webResponse, string streamEncoding)
        {
            using (var responseStream = webResponse.GetResponseStream())
            {
                using (StreamReader reader = (streamEncoding != null ? new StreamReader(responseStream, Encoding.GetEncoding(streamEncoding)) : new StreamReader(responseStream)))
                {
                    string streamContents = reader.ReadToEnd();
                    return streamContents;
                }
            }
        }

    }

}
