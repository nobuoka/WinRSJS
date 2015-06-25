using Windows.Storage.Streams;

namespace WinRSJS
{
    public sealed class WindowsRuntimeBuffer
    {
        public static IBuffer Create(int capacity) {
            return System.Runtime.InteropServices.WindowsRuntime.WindowsRuntimeBuffer.Create(capacity);
        }
    }
}
