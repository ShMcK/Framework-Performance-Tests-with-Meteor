/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

var path = require("path");
var os = require("os");
var Winreg = require('winreg');
var when = require("when");

/**
 * Takes a path to a binary file (like `/Applications/FirefoxNightly.app`)
 * and based on OS, resolves to the actual binary file. Accepts an optional
 * `platform` and `arch` parameter for testing.
 *
 * @param {String} binaryPath
 * @param {String} (platform)
 * @param {String} (arch)
 * @return {Promise}
 */
function normalizeBinary (binaryPath, platform, arch) {
  return when.promise(function(resolve, reject) {
    platform = platform || os.platform();
    arch = arch || os.arch();
    binaryPath = binaryPath || process.env.JPM_FIREFOX_BINARY || "firefox";

    arch = /64/.test(arch) ? "(64)" : "";
    platform = /darwin/i.test(platform) ? "osx" :
               /win/i.test(platform) ? "windows" + arch :
               /linux/i.test(platform) ? "linux" + arch :
               platform;

    var app = binaryPath.toLowerCase();
    binaryPath = normalizeBinary.paths[app + " on " + platform] ||
                 normalizeBinary.paths[app + " on " + platform + arch] ||
                 binaryPath;

    var isAppPath = platform === "osx" && path.extname(binaryPath) === ".app";

    // On OSX, if given the app path, resolve to the actual binary
    binaryPath = isAppPath ? path.join(binaryPath, "Contents/MacOS/firefox-bin") :
                 binaryPath;
    var channelNames = ["firefox", "beta", "nightly", "aurora"];
    // not Windows or binary path given
    if (platform.indexOf("windows") === -1 || channelNames.indexOf(app) === -1) {
      return resolve(binaryPath);
    }
    // Windows binary finding
    var appName = "Mozilla Firefox";
    switch(app) {
      case "beta":
        // the default path in the beta installer is the same as the stable one
        appName = "Mozilla Firefox";
        break;
      case "aurora":
        appName = "Aurora";
        break;
      case "nightly":
        appName = "Nightly";
        break;
      default:
        break;
    }

    // this is used when reading the registry goes wrong.
    function fallBack () {
      var programFilesVar = "ProgramFiles";
      if (arch === "(64)") {
        programFilesVar = "ProgramFiles(x86)";
      }
      resolve(path.join(process.env[programFilesVar], appName, "firefox.exe"));
    }

    var rootKey = '\\Software\\Mozilla\\';
    if (arch === "(64)") {
      rootKey = '\\Software\\Wow6432Node\\Mozilla';
    }
    rootKey = path.join(rootKey, appName);

    return when.promise(function(resolve, reject) {
      var versionKey = new Winreg({
        hive: Winreg.HKLM,
        key: rootKey
      });
      versionKey.get("CurrentVersion", function(err, key) {
        return (err) ? reject() : resolve(key.value);
      });
    }).then(function(version) {
      var mainKey = new Winreg({
        hive: Winreg.HKLM,
        key: path.join(rootKey, version, "Main")
      });
      mainKey.get("PathToExe", function(err, key) {
        if (err) {
          fallBack();
          return;
        }
        resolve(key.value);
      });
    }, fallBack);
  });
}

normalizeBinary.paths = {
  "firefox on osx": "/Applications/Firefox.app/Contents/MacOS/firefox-bin",
  "beta on osx": "/Applications/FirefoxBeta.app/Contents/MacOS/firefox-bin",
  "aurora on osx": "/Applications/FirefoxAurora.app/Contents/MacOS/firefox-bin",
  "nightly on osx": "/Applications/FirefoxNightly.app/Contents/MacOS/firefox-bin",

  "firefox on linux": "/usr/lib/firefox",
  "beta on linux": "/usr/lib/firefox-beta",
  "aurora on linux": "/usr/lib/firefox-aurora",
  "nightly on linux": "/usr/lib/firefox-nightly",

  "firefox on linux(64)": "/usr/lib64/firefox",
  "beta on linux(64)": "/usr/lib64/firefox-beta",
  "aurora on linux(64)": "/usr/lib64/firefox-aurora",
  "nightly on linux(64)" : "/usr/lib64/firefox-nightly"
};

exports.normalizeBinary = normalizeBinary;
