/*
Copyright 2015 Yu Nobuoka

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

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
