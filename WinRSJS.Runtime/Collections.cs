using System;
using System.Collections.Generic;

namespace WinRSJS
{
    public sealed class Collections
    {
        static public object /* IMap<?, ?> */ CreateMap(string keyTypeName, string valTypeName)
        {
            Type typeKey = Type.GetType(keyTypeName);
            if (typeKey == null)
            {
                throw new ArgumentException("Key type name `" + keyTypeName + "` is invalid.");
            }

            Type typeVal = Type.GetType(valTypeName);
            if (typeVal == null)
            {
                throw new ArgumentException("Value type name `" + valTypeName + "` is invalid.");
            }

            Type typeDict = typeof(Dictionary<,>).MakeGenericType(new Type[] { typeKey, typeVal });
            return Activator.CreateInstance(typeDict);
        }
    }
}
