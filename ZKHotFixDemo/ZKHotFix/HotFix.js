// 调用一个类方法
runClassMethod('ViewController', 'runClassMethod');


// 修复传参
fixMethod('ZKCrash', 'instanceMethodMightCrash:', 1, false,
          function(instance, originInvocation, originArguments) {
              if (originArguments[0] == null) {
                  console.log('fix it');
                  // 调用一个实例方法取值
                  ab = runInstanceMethod('ViewController', 'runInstanceMethod:b:', new Array("a", "b"));
                  // 修改参数
                  originArguments[0] = ab;
                  setInvocationArgs(originInvocation, originArguments);
                  runInvocation(originInvocation);
              } else {
                  // 不满足修复条件的跳过此修复
                  runInvocation(originInvocation);
              }
          }
);

// 修复返回值
fixMethod('ZKCrash', 'instanceMethodReturnMightCrash', 1, false,
        function(instance, originInvocation, originArguments) {
            // 调用一个实例方法 并获取返回值
            a = runInstanceMethod('ViewController', 'runInstanceMethodGetInt');
            // 修改返回值
            setInvocationReturnValue(originInvocation, a);
        }
);
