using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


using Amazon.Lambda.Core;

using System.Reflection;
using Pchp.Core;
using Pchp.Core.Reflection;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace LamdbaTest
{
    public class Function
    {
        
        /// <summary>
        /// A simple function that takes a string and does a ToUpper
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        [LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]
        public object FunctionHandler(ILambdaContext context)
        {
            Context.AddScriptReference(Assembly.Load(new AssemblyName("phplib")));

            using (var ctx = Context.CreateConsole(""))
            {
                ctx.Include("", "UserFetcher.php");
                dynamic userFetcher = ctx.Create("UserFetcher");
                String userId = userFetcher.getNearestUserId().ToString();

                return new { userId = userId};
            }
        }
    }
}
